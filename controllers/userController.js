import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

//join 처리 controller를 middleware로 탈바꿈
export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    req.flash('error', "passwords don't match");
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Log In" });

// passport 인증방식은 username(email) password찾아 보도록 설정
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
  successFlash:"welcom",
  failureRedirect:"Can't log in. check email and/or password"
});
//github를 다녀오면 아래 함수가 실행 됨 


export const githubLogin = passport.authenticate("github")

export const githubLoginCallback = (accessToken, refreshToken, profile, cb) => 
{
  User.findOrCreate({ githubId: profile.id }, function (err, user) {
    return cb(err, user);
  });
};

export const postGithubLogin = (req,res) => {
  res.send(routes.home);
};


export const logout = (req, res) => {
  req.logout()
  res.redirect(routes.home);
};

export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "User Detail" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
