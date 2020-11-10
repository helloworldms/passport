import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = req.user || {}; //user가 존재하거나,아니면 존재하지 않는다면 비어있는 obeject를 주도록
  next();
};
// passport와 session덕에 req.user를 통해 로그인된 사용자가 누구인지 알 수 있음
export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next(); // 만약 req.user가 존재한다면, 즉 사용자가 로그인 상태라면, next 그렇지 않다면 다시 홈
  } else {
    res.redirect(routes.home);
  }
};

//passport가 사용자 로그인 시킬 때 passport는 쿠키나 serialise, deserialize 등의 기능을 다 지원해줌,
//user가 담긴 object를 요청(request)에도 올려줌

export const uploadVideo = multerVideo.single("videoFile");
