var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
var compression = require("compression");
var helmet = require("helmet");
app.use(helmet());
var session = require("express-session");
var FileStore = require("session-file-store")(session);
var flash = require("connect-flash");

app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(compression());
app.use(
  session({
    secret: "asadlfkj!@#!@#dfgasdg",
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
  })
);

var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

//configure

passport.use(
  { usernameField: "email", passwordField: "pwd" },

  new LocalStrategy(function (username, password, done) {
    console.log("LocalStrategy", username, password);
    if(username === authdata.email){
      console.log(1);
      if(password === authdata.password){
        console.log(2);
        return done(null,authdata);
        }else{
        console.log(3);
        return done(null,false,{message: 'incorrect password.'})
      }
    }else{
      console.log(4)
      return done(null,false,{message:'incorrect username.'})
    }
  })
);

//로컬 유저네임 페스워드 통해 로긴하는 것
app.post(
  "/auth/login_process",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login_process",
  })
);

app.get("*", function (request, response, next) {
  fs.readdir("./data", function (error, filelist) {
    request.list = filelist;
    next();
  });
});

var indexRouter = require("./routes/index");
var topicRouter = require("./routes/topic");
var authRouter = require("./routes/auth")(passport);

app.use("/", indexRouter);
app.use("/topic", topicRouter);
app.use("/auth", authRouter);

app.use(function (req, res, next) {
  res.status(404).send("Sorry cant find that!");
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
