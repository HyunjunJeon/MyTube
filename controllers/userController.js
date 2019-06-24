import routes from "../routes";
import { User } from "../models";

import passport from 'passport';

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 }
  } = req;
  if(password !== password2){
    res.status(400);
    res.render("join", {pageTitle: "Join"});
  }else {
    try{
      const user = await User({
        name, email
      });
      await User.register(user, password);
      next();
    }catch(err){
      console.error(err);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req,res) => {
  res.render("login", { pageTitle: "LogIn" });
};

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home
});

export const githubLogin = passport.authenticate("github");

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const githubLoginCallBack = async (accessToken, refreshToken, profile, cb) => {
  const { _json: { id, avatar_url, name, email }} = profile;
  try{
    const user = await User.findOne({ email });
    if(user){
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl: avatar_url
    });
    return cb(null, newUser);
  }catch(err){
    console.error(err);
    cb(err);
  }
};

export const googleLogin = passport.authenticate("google");

export const postGoogleLogin = (req, res) => {
  res.redirect(routes.home);
};

export const googleLoginCallBack = (accessToken, refreshToken, profile, cb) => {
  console.log(accessToken, refreshToken, profile, cb);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });

export const getMe = async (req, res) => {
  const { params: { id }} = req;
  try{
    const existUser = await User.findById({id});
    res.render("userDetail", { pageTitle: "User Detail", user });
  }catch(err){
    console.error(err);
    res.redirect(routes.home);
  }
};