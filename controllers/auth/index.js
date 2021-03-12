const singUp = require("./signup");
const login = require("./login");
const logout = require("./logout");

module.exports = {
  getSignup: singUp.getSignUp,
  postSingUp: singUp.postSignUp,
  getLogin: login.getLogin,
  postLogin: login.postLogin,
  logout: logout,
};
