import { Request } from "express";

export type FlashMessageTypes = "INFO" | "ERROR" | "SUCCESS";

export type FlasKeyType = {
  [key: string]: FlashMessageTypes;
};
const flashKeys: FlasKeyType = {
  error: "ERROR",
  success: "SUCCESS",
  info: "INFO",
};
export type FlashKeys = keyof typeof flashKeys;

export type FlashMessage = {
  type: FlashMessageTypes;
  messages: string[];
};

export const flashAddMessage = (
  req: Request,
  key: FlashKeys,
  message: string
) => {
  req.flash(key.toString(), message);
};

export const flashGetAllMessages = (req: Request) => {
  const messages: FlashMessage[] = [];
  Object.keys(flashKeys).forEach((key) => {
    const flashMessage = req.flash(key);
    if (flashMessage.length > 0) {
      messages.push({
        type: flashKeys[key],
        messages: flashMessage,
      });
    }
  });
  return messages;
};
