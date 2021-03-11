const resRenderError = (res, view, pageTitle, args = {}) => {
  return res.status(422).render(view, {
    pageTitle: pageTitle,
    path: "/login",
    ...args,
  });
};
module.exports = resRenderError;
