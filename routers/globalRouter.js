import express from 'express';
import routes from '../routes';
import { home, search } from "../controllers/videoController";
import {  logout, getJoin, postJoin, postLogin, getLogin, githubLogin, postGithubLogin } from "../controllers/userController";
import { onlyPublic, onlyPrivate } from '../localmiddlewares';
import passport from 'passport';

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.search, search);

globalRouter.get(routes.github, githubLogin);
globalRouter.get(routes.githubCallBack, passport.authenticate("github", {
    failureRedirect: routes.login
}), postGithubLogin);

export default globalRouter;
