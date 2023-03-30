export class CreateRefreshTokenDto {
  token: string;
  userId: string;
  expiresIn: Date;
}
