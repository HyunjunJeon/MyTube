import multer from 'multer';
import routes from './routes';
import dotenv from 'dotenv';
dotenv.config();

/*
    1. File Upload
    2. Access Authority
*/

const multerVideo = multer({
    dest: "uploads/videos/"
});

const multerAvatar = multer({
    dest: "uploads/avatars/"
});

export const localMiddlewares = (req, res, next) => {
    res.locals.siteName = "MyTube";
    res.locals.routes = routes;
    res.locals.logginUser = req.user || null;
    next();
};

export const onlyPublic = (req, res, next) => {
    if (req.user) {
        res.redirect(routes.home);
    } else {
        next();
    }
};

export const onlyPrivate = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect(routes.home);
    }
};

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");