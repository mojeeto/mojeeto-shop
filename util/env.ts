import { cleanEnv, str } from "envalid";
import dotenv from "dotenv";
dotenv.config();

const env = cleanEnv(process.env, {
  MONGO_URL_CONNECT: str(),
  MONGO_URL_DB: str(),
  SESSION_SECRET: str(),
  SESSION_COLLECTION_NAME: str(),
});

export default env;
