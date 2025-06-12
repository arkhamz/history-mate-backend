export type AuthInput = { username: string; password: string };
export type SignInData = { userId: string; username: string };
export type AuthResult = {
  accessToken: string;
  userId: string;
  username: string;
};
