exports.getIndex = (req, res) => {
  return res.redirect("/auth/login");
};

exports.getDashboard = (req, res) => {
  console.log(req.session.user.user_name);
  res.render("dashboard", {});
};
