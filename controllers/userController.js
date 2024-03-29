import routes from "../routes";
import {
  User
} from "../models";

import passport from 'passport';

export const getJoin = (req, res) => {
  res.render("join", {
    pageTitle: "Join"
  });
};

export const postJoin = async (req, res, next) => {
  const {
    body: {
      name,
      email,
      password,
      password2
    }
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", {
      pageTitle: "Join"
    });
  } else {
    try {
      const user = await User({
        name,
        email
      });
      await User.register(user, password);
      next();
    } catch (err) {
      console.error(err);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) => {
  res.render("login", {
    pageTitle: "LogIn"
  });
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
  const {
    _json: {
      id,
      avatar_url,
      name,
      email
    }
  } = profile;
  try {
    const user = await User.findOne({
      email
    });
    if (user) {
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
  } catch (err) {
    console.error(err);
    cb(err);
  }
};

export const facebookLogin = passport.authenticate("facebook");

export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};

export const facebookLoginCallBack = async (accessToken, refreshToken, profile, cb) => {
  const {
    _json: {
      id,
      name,
      email
    }
  } = profile;
  try {
    const user = await User.findOne({
      email
    });
    if (user) {
      user.facebookId = id;
      user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      facebookId: id,
      avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`
    });
    return cb(null, newUser);
  } catch (err) {
    console.error(err);
    cb(err);
  }
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const getEditProfile = (req, res) =>
  res.render("editProfile", {
    pageTitle: "Edit Profile"
  });

export const postEditProfile = async (req, res) => {
  const {
    body : {name, email}, file
  } = req;
  try{
    const user = await User.findByIdAndUpdate(req.user.id, { 
      name, 
      email, 
      avatarUrl: file ? file.path : req.user.avatarUrl 
    });
    res.redirect(routes.me);
  }catch(err){
    console.error(err);
    res.render("editProfile", {
      pageTitle: "Edit Profile"
    });
  }
};

export const getChangePassword = (req, res) =>
  res.render("changePassword", {
    pageTitle: "Change Password"
});

export const postChangePassword = async (req, res) => {
  const {
    body: {oldPassword, newPassword, newPassword1}
  } = req;
  try{
    if(newPassword !== newPassword1){
      res.status(400);
      res.redirect(`${routes.users}${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  }catch(err){
    console.error(err);
    res.status(400);
    res.redirect(`${routes.users}${routes.changePassword}`);
  }
};

export const getMe = (req, res) => {
  res.render("userDetail", {
    pageTitle: "User Detail",
    user: req.user
  });
};

export const userDetail = async (req, res) => {
  const {
    params: {
      id
    }
  } = req;
  try {
    const existUser = await User.findById(id).populate("videos");
    res.render("userDetail", {
      pageTitle: "User Detail",
      user: existUser
    });
  } catch (err) {
    console.error(err);
    res.redirect(routes.home);
  }
};