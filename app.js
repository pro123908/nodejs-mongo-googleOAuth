const express = require("express");
const path = require("path");
const app = express();
const morgan = require("morgan");
const passport = require("passport");
const expressSession = require("express-session");
const expressHandleBars = require("express-handlebars");
const connectDB = require("./config/db");

const dotenv = require("dotenv");

//Load config
dotenv.config({ path: "./config/config.env" });

// passport
require("./config/passport")(passport);

// Database connection
connectDB();

// static assets
app.use(express.static(path.join(__dirname, "public")));

// Logging
process.env.NODE_ENV === "development" ? app.use(morgan("dev")) : null;

// Template
app.engine(
  ".hbs",
  expressHandleBars({ defaultLayout: "main", extname: ".hbs" })
);
app.set("view engine", ".hbs");

// express sessions
app.use(
  expressSession({
    secret: "some secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware
app.use(passport.initialize());

//Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
