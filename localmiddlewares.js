import multer from 'multer';
import routes from './routes';
import dotenv from 'dotenv';
dotenv.config();

const multerVideo = multer({
    dest: "uploads/videos/"
})

export const localMiddlewares = (req, res, next) => {
    res.locals.siteName = "MyTube";
    res.locals.routes = routes;
    // sample login Object
    res.locals.user = {
        isAuthenticated: false,
        id: 1
    };
    next();
};

export const uploadVideo = multerVideo.single("videoFile");