const express = require("express");
const path = require("path");
const morgan = require("morgan");
const passport = require("passport");
const expressSession = require("express-session");
const expressHandleBars = require("express-handlebars");
const dotenv = require("dotenv");
const MongoStore = require("connect-mongo")(expressSession);
const mongoose = require("mongoose");

// Importing database file
const connectDB = require("./config/db");

// Initializing express application
const app = express();

//Load config
dotenv.config({ path: "./config/config.env" });

// passport
require("./config/passport")(passport);

// Database connection
connectDB();

// static assets to make public folder a static folder
app.use(express.static(path.join(__dirname, "public")));

// For Logging of routes in development mode
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
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Initializing Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
