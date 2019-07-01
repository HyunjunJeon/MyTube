import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import "./passport";
import passport from 'passport';

import routes from './routes';
import { globalRouter, userRouter, videoRouter, apiRouter } from "./routers";
import { localMiddlewares } from "./localmiddlewares"; 

const app = express();
const CookieStore = MongoStore(session);

// Setting
app.set("view engine", "pug");

// 3rd Party Middlewares & Statics
app.use(helmet());
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(morgan("dev")); // TODO: #11.5 이후 로깅 관련해서 수정해야함...
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new CookieStore({ mongooseConnection: mongoose.connection})
  })// 서버 세션 저장
);

// TODO: #11.8User Auth 관련 모듈 분리 및 추가 예정(Facebook, Google X // Kakao)
app.use(passport.initialize());
app.use(passport.session());

// Custom Middlewares
app.use(localMiddlewares);

// Routers
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;