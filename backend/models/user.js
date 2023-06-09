const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");
const UnAuthorizedError = require("../errors/UnAuthorizedError");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Жак-Ив Кусто",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Исследователь",
  },
  avatar: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate: {
      validator: isEmail,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new UnAuthorizedError("Неправильные почта или пароль")
        );
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new UnAuthorizedError("Неправильные почта или пароль")
          );
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
