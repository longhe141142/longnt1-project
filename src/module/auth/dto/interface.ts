import { RefreshToken } from './../../../entities/refreshToken';
import { User } from './../../../entities/user';
export type TokenAndUser = {
  token: RefreshToken;
  user: User;
};
