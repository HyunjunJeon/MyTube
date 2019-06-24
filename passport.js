import passport from "passport";
import User from "./models/User";
import GithubStrategy from 'passport-github';
import { githubLoginCallBack } from "./controllers/userController";
import GoogleStrategy from 'passport-google-oauth20';
import routes from './routes';

passport.use(User.createStrategy());
passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_APP_ID,
    clientSecret: process.env.GITHUB_APP_SECRET,
    callbackURL: `http://localhost:${process.env.SERVER_PORT}${routes.githubCallBack}`
}, githubLoginCallBack));
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_APP_ID,
    clientSecret: process.env.GOOGLE_APP_SECRET,
    callbackURL: `http://localhost:${process.env.SERVER_PORT}${routes.googleCallBack}`
}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());