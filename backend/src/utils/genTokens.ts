import jwt from "jsonwebtoken"
import { JWTTokenPayload } from "../types/types"

export const genAccessToken = (payload: JWTTokenPayload) => {
  return jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: '15m' }
  );
};


export const genRefreshToken = (payload: JWTTokenPayload) => {
  return jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: '7d' }
  );
};
