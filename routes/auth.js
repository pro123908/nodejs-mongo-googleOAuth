const express = require("express");
const passport = require("passport");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// @desc Google Auth
// @route GET /auth/google
router.get(
  "/google",
  ensureGuest,
  passport.authenticate("google", { scope: ["profile"] })
);

// @desc Google Auth Callback
// @route GET /auth/google/callback
router.get(
  "/google/callback",
  ensureGuest,
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

// @desc Google logout
// @route /auth/logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
