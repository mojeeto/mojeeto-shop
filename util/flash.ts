import { Request } from "express";

export type FlashMessageTypes = "INFO" | "ERROR" | "SUCCESS";

const flashKeys: { [key: string]: FlashMessageTypes } = {
  UserNotFound: "ERROR",
};
export type FlashKeys = keyof typeof flashKeys;

export type FlashMessage = {
  type: FlashMessageTypes;
  message: string;
};

export const flashAddMessage = (
  req: Request,
  key: FlashKeys,
  message: string
) => {
  req.flash(key.toString(), message);
};

export const flashGetAllMessages = (req: Request) => {
  const messages = Object.keys(flashKeys).map((key) => ({
    type: flashKeys[key],
    messages: req.flash(key),
  }));
  return messages;
};
