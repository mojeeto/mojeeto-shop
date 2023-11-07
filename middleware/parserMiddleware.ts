import bodyParser from "body-parser";
import { Router } from "express";

const parserMiddleware = Router();

parserMiddleware.use(bodyParser.urlencoded({ extended: false }));

export default parserMiddleware;
