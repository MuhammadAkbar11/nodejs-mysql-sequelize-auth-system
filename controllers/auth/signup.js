const { validationResult } = require("express-validator");
const User = require("../../models/user");
const resRenderError = require("../../utils/resRenderError");
const validatorErrMsg = require("../../utils/validatorErrMsg");

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
  const { email, password } = req.body;

  const errors = validationResult(req);
  const flashValidator = validatorErrMsg(errors.array());

  if (!errors.isEmpty()) {
    return resRenderError(res, "auth/sign-up", "Login", {
      path: "/login",
      flashdata: flashdata,
      inputsVal: req.body,
      errors: flashValidator,
    });
  }
  // const user = await User.findOne({ where: { user_email: email } });
  // if (!user) {
  //   req.flash("flashdata", {
  //     type: "error",
  //     message: "Email not found",
  //   });
  //   res.redirect("/auth/login");
  //   return;
  // }

  // if (password !== user.user_password) {
  //   req.flash("flashdata", {
  //     type: "error",
  //     message: "Wrong password",
  //   });
  //   res.redirect("/auth/login");
  //   return;
  // }

  // req.session.isLoggedIn = true;
  // req.session.user = user;

  // return req.session.save(err => {
  //   if (err) {
  //     req.flash("flashdata", {
  //       type: "error",
  //       message: "Failed to login",
  //     });
  //     res.redirect("/login");
  //   }
  //   res.redirect("/dashboard");
  // });
};
