import multer from "multer";
import bodyParser from "body-parser";
import { Router } from "express";

const parserMiddleware = Router();
const multerStorage = multer.diskStorage({
  filename(req, file, callback) {
    callback(null, new Date().toISOString() + file.originalname);
  },
  destination(req, file, callback) {
    callback(null, "images");
  },
});

parserMiddleware.use(bodyParser.urlencoded({ extended: false }));
parserMiddleware.use(
  multer({
    storage: multerStorage,
    fileFilter(req, file, callback) {
      if (["image/jpeg", "image/png"].find((item) => file.mimetype === item))
        return callback(null, true);
      callback(null, false);
    },
  }).single("image")
);

export default parserMiddleware;
