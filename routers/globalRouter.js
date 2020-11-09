import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import {
  getJoin,
  getLogin,
  logout,
  postJoin,
  postLogin,
  githubLogin,
  githubLoginCallback,
} from "../controllers/userController";
import passport from "passport";

const globalRouter = express.Router();

//onlypublic = 로그인된 유져
// 로긴된 유저는 조인과 로그인을 볼 필요 없음

globalRouter.get(routes.join, onlyPublick, getJoin);
globalRouter.post(routes.join, onlyPublick, postJoin, postLogin);
// postjoin에서 받은 username과 password 정보들을 postLoginㅇ로 보냄
// login에서 form을 통해 postlogin에게 정보를 주듯이

globalRouter.get(routes.login, onlyPublick, getLogin);
globalRouter.post(routes.login, onlyPublick, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, logout);

globalRouter.get(routes.github, githubLogin);
globalRouter.get(routes.githubCallback, passport);

export default globalRouter;
