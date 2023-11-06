import { NextFunction, Request, Response } from "express";
import { ValidationError } from "express-validator";

export type Controller = (
  req: Request,
  res: Response,
  next: NextFunction,
  validationErrors?: ValidationError[]
) => void;
