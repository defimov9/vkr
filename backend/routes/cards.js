const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
  getUserCards,
} = require("../controllers/cards");
const upload = require("../middlewares/file");

router.post("/", upload.fields([{ name: "link" }]), createCard);

router.get("/", getCards);

router.get("/user-cards", getUserCards);

router.delete(
  "/:cardId",
  celebrate({
    params: Joi.object().keys({ cardId: Joi.string().length(24).hex() }),
  }),
  deleteCard
);

router.put(
  "/:cardId/likes",
  celebrate({
    params: Joi.object().keys({ cardId: Joi.string().length(24).hex() }),
  }),
  likeCard
);

router.delete(
  "/:cardId/likes",
  celebrate({
    params: Joi.object().keys({ cardId: Joi.string().length(24).hex() }),
  }),
  dislikeCard
);

module.exports = router;
