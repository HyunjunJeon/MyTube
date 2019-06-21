import passport from "passport";
import User from "./models/User";
import GithubStrategy from 'passport-github';
import { githubLoginCallBack } from "./controllers/userController";
import routes from './routes';

passport.use(User.createStrategy());
passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_APP_ID,
    clientSecret: process.env.GITHUB_APP_SECRET,
    callbackURL: `http://localhost:${process.env.SERVER_PORT}${routes.githubCallBack}`
}), githubLoginCallBack);


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());