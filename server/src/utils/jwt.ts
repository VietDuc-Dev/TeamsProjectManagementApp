import jwt, { SignOptions } from "jsonwebtoken";
import { UserDocument } from "../models/user.model";
import { config } from "../config/app.config";

export type AccessTPayload = {
  userId: UserDocument["_id"];
};

type SignOptsAndSecret = SignOptions & {
  secret: string;
};

const defaults: SignOptions = {
  audience: ["user"],
};

const JWT_EXPIRES_IN = "1d";

export const accessTokenSignOptions: SignOptsAndSecret = {
  expiresIn: JWT_EXPIRES_IN || config.JWT_EXPIRES_IN,
  secret: config.JWT_SECRET,
};

export const signJwtToken = (
  payload: AccessTPayload,
  options?: SignOptsAndSecret
) => {
  const { secret, ...otps } = options || accessTokenSignOptions;
  return jwt.sign(payload, secret, {
    ...defaults,
    ...otps,
  });
};
