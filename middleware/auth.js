module.exports = {
  ensureAuth: function (req, res, next) {
    return req.isAuthenticated() ? next() : res.redirect("/");
  },

  ensureGuest: function (req, res, next) {
    return req.isAuthenticated() ? res.redirect("/dashboard") : next();
  },
};
