const express = require("express");
const app = express();
const tradesRoute = require("./routes/tradeRoutes");
const mainRoute = require("./routes/mainRoutes");
const userRoutes = require("./routes/userRoutes");
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

mongoose.connect('mongodb://localhost:27017/trade', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    //start the server
    let port = 3000;
    let host = "localhost"
    app.listen(port, host, () => {
      console.log('Server is running on port', port);
    })
  })
  .catch(err => console.log(err.message))

app.use(
  session({
    secret: "ajfeirf90aeu9eroejfoefj",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongoUrl: 'mongodb://localhost:27017/trade' }),
    cookie: { maxAge: 60 * 60 * 1000 }
  })
);
app.use(flash());

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.fullname = req.session.fullname || null;
  res.locals.errorMessages = req.flash('error');
  res.locals.successMessages = req.flash('success');
  next();
});

const morgan = require("morgan");
app.use(morgan("tiny"));

const methodoverride = require("method-override");
app.use(methodoverride("_method"));

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use("/", mainRoute);

app.use("/users", userRoutes);

app.use("/trades", tradesRoute);

app.use((req, res, next) => {
  let err = new Error("Serevr cannot locate the given URL " + req.url);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  if (!err.status) {
    err.status = 500;
    err.message = "Internal server error";
  }
  res.status(err.status);
  res.render("error", { error: err });
});


