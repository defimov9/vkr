const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
const ConflictError = require("../errors/ConflictError");
const { CodeSuccess } = require("../constants");
const fs = require("fs");
const path = require("path");

const { NODE_ENV, JWT_SECRET } = process.env;
const SALT_ROUNDS = 10;

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, password, email } = req.body;
  console.log(req.body);
  bcrypt
    .hash(password, SALT_ROUNDS)
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        password: hash,
        email,
      })
    )
    .then((user) =>
      res.status(CodeSuccess.CREATED).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
        email: user.email,
      })
    )
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Переданы некорректные данные"));
        return;
      }
      if (err.code === 11000) {
        next(new ConflictError("Такой пользователь уже существует"));
        return;
      }
      next(err);
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(CodeSuccess.OK).send(users))
    .catch(next);
};

module.exports.getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(new NotFoundError("Пользователь не найден"))
    .then((user) => res.status(CodeSuccess.OK).send(user))
    .catch((err) => {
      if (err.name === "CastError" || err.name === "ValidationError") {
        next(new BadRequestError("Переданы некорректные данные"));
        return;
      }
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(new NotFoundError("Пользователь не найден"))
    .then((user) => res.status(CodeSuccess.OK).send(user))
    .catch((err) => {
      if (err.name === "CastError" || err.name === "ValidationError") {
        next(new BadRequestError("Переданы некорректные данные"));
        return;
      }
      next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const avatarUrl = req.file.filename;
  User.findById(req.user._id).then((user) => {
    const avatarPath = path.join(__dirname, "../uploads/avatars", user.avatar);
    fs.unlink(avatarPath, (err) => {
      if (err) {
        console.error("Ошибка при удалении предыдущего аватара:", err);
      }
    });
  });

  User.findByIdAndUpdate(req.user._id, { avatar: avatarUrl }, { new: true })
    .orFail(new NotFoundError("Пользователь не найден"))
    .then((user) => res.status(CodeSuccess.OK).send(user))
    .catch((err) => {
      if (err.name === "CastError" || err.name === "ValidationError") {
        next(new BadRequestError("Переданы некорректные данные"));
        return;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        { expiresIn: "7d" }
      );
      res.send({ token });
    })
    .catch(next);
};
