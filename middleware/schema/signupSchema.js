const { checkSchema } = require("express-validator");
const User = require("../../models/user");

const signUpValidator = checkSchema({
  name: {
    notEmpty: {
      errorMessage: "Enter your name",
    },
  },
  email: {
    notEmpty: {
      errorMessage: "Enter youe email address",
    },
    normalizeEmail: true,
    isEmail: {
      errorMessage: "Invalid email",
    },
    custom: {
      options: async (value, { req }) => {
        const isUser = await User.findOne({
          where: {
            user_email: email,
          },
        });

        if (isUser) {
          Promise.reject("Email already exits");
        }

        return true;
      },
    },
  },
  password: {
    notEmpty: {
      errorMessage: "enter your password",
    },
    isLength: {
      errorMessage: "Password should be at least 5 chars long",
      options: {
        min: 5,
      },
    },
  },
  password2: {
    notEmpty: {
      errorMessage: "enter confirm password",
    },
    custom: {
      options: (value, { req, location, path }) => {
        if (value !== req.body.password) {
          throw new Error("Password have to match!");
        }
        return true;
      },
    },
  },
});

module.exports = signUpValidator;
