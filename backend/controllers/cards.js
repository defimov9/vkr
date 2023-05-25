const Card = require("../models/card");
const User = require("../models/user");
const NotFoundError = require("../errors/NotFoundError");
const BadRequestError = require("../errors/BadRequestError");
const ForbiddenError = require("../errors/ForbiddenError");
const { CodeSuccess } = require("../constants");
const fs = require("fs");
const path = require("path");

// module.exports.createCard = (req, res, next) => {
//   const { name, link } = req.body;

//   Card.create({ name, link, owner: req.user._id })
//     .then((card) => res.status(CodeSuccess.CREATED).send(card))
//     .catch((err) => {
//       if (err.name === 'CastError' || err.name === 'ValidationError') {
//         next(new BadRequestError('Переданы некорректные данные'));
//         return;
//       }
//       next(err);
//     });
// };

module.exports.createCard = (req, res, next) => {
  const { name } = req.body;
  const cardUrl = req.files["link"][0].filename;

  Card.create({ name, link: cardUrl, owner: req.user._id })
    .then((card) => res.status(CodeSuccess.CREATED).send(card))
    .catch((err) => {
      if (err.name === "CastError" || err.name === "ValidationError") {
        next(new BadRequestError("Переданы некорректные данные"));
        return;
      }
      next(err);
    });
};

module.exports.getCards = (req, res, next) => {
  const { page, pageSize, findUserCards } = req.query;
  const pageNumber = parseInt(page);
  const itemsPerPage = parseInt(pageSize);

  // Рассчитываем индекс начальной и конечной позиции для выборки карточек
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = pageNumber * itemsPerPage;

  Card.find(parseInt(findUserCards) ? { owner: req.user._id } : {})
    .sort({ createdAt: -1 })
    .skip(startIndex)
    .limit(itemsPerPage)
    .then((cards) => {
      Card.countDocuments(
        parseInt(findUserCards) ? { owner: req.user._id } : {}
      ).then((totalCount) => {
        const totalPages = Math.ceil(totalCount / itemsPerPage);
        res.status(CodeSuccess.OK).send({
          cards,
          totalPages,
        });
      });
    })
    .catch(next);
};

module.exports.getUserCards = (req, res, next) => {
  Card.find({ owner: req.user._id })
    .sort({ createdAt: -1 })
    .then((cards) => res.status(CodeSuccess.OK).send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundError("Карточка не найдена"))
    .then((card) => {
      if (`${card.owner}` !== req.user._id) {
        throw new ForbiddenError(
          "Нельзя удалять карточки других пользователей"
        );
      }
      const cardPath = path.join(__dirname, "../uploads/cards", card.link);
      console.log(card);
      fs.unlink(cardPath, (err) => {
        if (err) {
          console.error("Ошибка при удалении картинки:", err);
        }
      });
      return Card.findByIdAndRemove(req.params.cardId);
    })
    .then((card) => {
      res.status(CodeSuccess.OK).send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Переданы некорректные данные"));
        return;
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new NotFoundError("Карточка не найдена"))
    .then((card) => res.status(CodeSuccess.OK).send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Переданы некорректные данные"));
        return;
      }
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new NotFoundError("Карточка не найдена"))
    .then((card) => res.status(CodeSuccess.OK).send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Переданы некорректные данные"));
        return;
      }
      next(err);
    });
};
