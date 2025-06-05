const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const app = express();
require("dotenv").config();
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const loginRoutes = require("./routes/login");
const signUpRoutes = require("./routes/sign-up");
const forgotPasswordRoutes = require("./routes/forgot-password");
const folderRoutes = require("./routes/folders");
const fileRoutes = require("./routes/files");
const {
  fetchUserForLogin,
  getUserById,
  getFolderByUser,
} = require("./db/queries");
app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "users", resave: false, saveUninitialized: false }));

app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await fetchUserForLogin(username);
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use("/", loginRoutes);
app.use("/sign-up", signUpRoutes);
app.use("/forgot-password", forgotPasswordRoutes);
app.use("/folder", folderRoutes);
app.use("/files", fileRoutes);
app.use(async (err, req, res, next) => {
  try {
    let error = null;
    const folders = await getFolderByUser(req.user);
    if (err.message === "Only pdf, doc, png and jpg files can be uploaded") {
      return res.render("index", {
        user: req.user,
        message: req.session.messages,
        folders: folders,
        files: [],
        errorFolder: error,
        error: err.message,
      });
    } else if (err.message === "File too large") {
      return res.render("index", {
        user: req.user,
        message: req.session.messages,
        folders: folders,
        files: [],
        errorFolder: error,
        error: `${err.message}. Can only upload upto 5Mb`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).render("errorPage");
  }
});
app.listen(3000, () => console.log("app listening on port 3000!"));
