module.exports = (req, res, next) => {
  const { isLoggedIn } = req.session;
  if (!isLoggedIn) {
    return res.redirect("/auth/login");
  }
  next();
};
