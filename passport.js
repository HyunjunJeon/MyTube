import passport from "passport";
import User from "./models/User";
import GithubStrategy from "passport-github";
import {
    githubLoginCallBack,
    facebookLoginCallBack
} from "./controllers/userController";
import FacebookStrategy from "passport-facebook";
import routes from './routes';

passport.use(User.createStrategy());
passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_APP_ID,
    clientSecret: process.env.GITHUB_APP_SECRET,
    callbackURL: `http://localhost:${process.env.SERVER_PORT}${routes.githubCallBack}`
}, githubLoginCallBack));
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.TEMPORARY_HTTPS_URL}`,
    profileFields: ['id', 'displayName', 'photos', 'email'],
    scope: ['public_profile', 'email']
}, facebookLoginCallBack));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());