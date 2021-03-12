exports.getIndex = (req, res) => {
  return res.redirect("/auth/login");
};

exports.getDashboard = (req, res) => {
  req.user
    .getRole()
    .then(result => {
      const user = {
        ...req.user.get(),
        role_name: result.role_name,
      };
      res.render("dashboard", {
        pageTitle: "Dashboard",
        user: user,
      });
    })
    .catch(err => console.log(err));
};
