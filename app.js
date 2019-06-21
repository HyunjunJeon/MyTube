import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';

import routes from './routes';
import { globalRouter, userRouter, videoRouter } from "./routers";
import { localMiddlewares } from "./localmiddlewares"; 

const app = express();

const CookieStore = MongoStore(session);

// Setting
app.set("view engine", "pug");

// Middlewares
app.use(helmet());
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new CookieStore({ mongooseConnection: mongoose.connection})
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(localMiddlewares);

// Routers
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);



export default app;