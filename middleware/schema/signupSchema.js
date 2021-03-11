const { checkSchema } = require("express-validator");
const User = require("../../models/user");

const signupSchema = checkSchema({
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
            user_email: value,
          },
        });
        console.log(isUser);
        if (isUser) {
          throw new Error("Email already exist");
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

module.exports = signupSchema;
