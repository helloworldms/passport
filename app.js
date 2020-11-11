import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "express-flash";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";

import "./passport";

const app = express();

const ckiesStore = MongoStore(session);
//
app.use(helmet());
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads/videos"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new cokieStore({ mongooseConnection: mongoose.connection }), // 쿠키가 보존됨
    ///saveUninitialized는 초기화되지 않은 uninitialized세션을 저장소에 저장합니다.
    ///새로운 새션이지만 변경되지 앟ㅇㄴ 세션은 초기화되지 않습니다.
    /// 로긴 session에 이용하려면,false를 선택하는것이 유용합니다.
    //session정보, 쿠키 정볻ㄹ을 메모리에 저장 서버는 쿠키 기억해야함
    //

    //connect-mongo(mongo와 연결하기)를 써서 sessiong에게 데이터를 mongostore라는 저장소에 저장하게 함
  })
);

app.use(passport.initialize());
app.use(passport.session());
// 이 위치에 passport.session을 쓰는 이유는 위에서 부터  실행된 cookiePaser로부터 쿠키가 쭉 내려와서
// passport는 초기화(initialize)되고 이후 passport가 스스로 쿠키를 들여다봐서, 그 쿠키 정보에 해당하는
// 사용자를 찾아줌
// passport는 자기가 찾은 그 사용자를 요청(req)의 object, 즉 req.user로 만들어줌

app.use(flash());

app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;
