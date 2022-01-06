export class TokenPayload {
  username: string;
  userId: string;
  sub: string;
  iat: number;
  exp?: number;
}
