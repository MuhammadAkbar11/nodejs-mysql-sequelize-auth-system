const { validationResult } = require("express-validator");
const User = require("../../models/user");
const resRenderError = require("../../utils/resRenderError");
const validatorErrMsg = require("../../utils/validatorErrMsg");

const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  const flashdata = req.flash("flashdata");

  res.render("auth/log-in", {
    pageTitle: "Login | phoenix.com",
    path: "/login",
    flashdata: flashdata,
    inputsVal: {
      email: "",
      password: "",
    },
    errors: {},
  });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  const flashValidator = validatorErrMsg(errors.array());
  const flashdata = req.flash("flashdata");
  console.log(flashValidator);
  if (!errors.isEmpty()) {
    return resRenderError(res, "auth/log-in", "Login", {
      path: "/login",
      flashdata: flashdata,
      inputsVal: req.body,
      errors: flashValidator,
    });
  }

  const user = await User.findOne({ where: { user_email: email } });
  return bcrypt.compare(password, user.user_password).then(match => {
    if (!match) {
      req.flash("flashdata", {
        type: "error",
        message: "Wrong password",
      });
      res.redirect("/auth/login");
      return;
    }

    req.session.isLoggedIn = true;
    req.session.user = user;
    return req.session.save(err => {
      if (err) {
        req.flash("flashdata", {
          type: "error",
          message: "Failed to login",
        });
        res.redirect("/auth/login");
      }
      res.redirect("/dashboard");
    });
  });
};
