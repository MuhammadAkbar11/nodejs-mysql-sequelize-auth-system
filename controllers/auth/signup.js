const { validationResult } = require("express-validator");
const User = require("../../models/user");
const resRenderError = require("../../utils/resRenderError");
const validatorErrMsg = require("../../utils/validatorErrMsg");

const bcrypt = require("bcryptjs");

exports.getSignUp = (req, res, next) => {
  const flashdata = req.flash("flashdata");

  res.render("auth/sign-up", {
    pageTitle: "Singup | phoenix.com",
    path: "/singup",
    flashdata: flashdata,
    inputsVal: {
      email: "",
      password: "",
    },

    errors: {},
  });
};

exports.postSignUp = async (req, res) => {
  const { name, email, password, password2 } = req.body;

  const errors = validationResult(req);
  const flashValidator = validatorErrMsg(errors.array());

  const flashdata = req.flash("flashdata");

  if (!errors.isEmpty()) {
    return resRenderError(res, "auth/sign-up", "Singup", {
      path: "/login",
      flashdata: flashdata,
      inputsVal: req.body,
      errors: flashValidator,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  // console.log(req.body, hashedPassword);

  const user = await new User({
    user_name: name,
    user_email: email,
    user_password: hashedPassword,
    user_photo:
      "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
    user_roleId: 1,
    roleRoleId: 1,
  });

  return user
    .save()
    .then(result => {
      res.json({
        status: 200,
        message: "Success create account",
        result: result,
      });
    })
    .catch(err => {
      if (err) {
        req.flash("flashdata", {
          type: "error",
          message: "Failed to sing up",
        });
        res.redirect("/auth/signup");
      }
    });
};
