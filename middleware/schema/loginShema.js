const { checkSchema } = require("express-validator");
const User = require("../../models/user");

const loginShema = checkSchema({
  email: {
    notEmpty: {
      errorMessage: "Enter youe email address",
    },
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
        if (!isUser) {
          throw new Error("Email not found");
        }

        return true;
      },
    },
  },
  password: {
    notEmpty: {
      errorMessage: "enter your password",
    },
  },
});

module.exports = loginShema;
