module.exports = (req, res) => {
  return req.session.destroy(err => {
    res.redirect("/auth/login");
  });
};
