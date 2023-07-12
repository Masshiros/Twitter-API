// status of user
export enum UserVerifyStatus {
  Unverified, // chưa xác thực email, mặc định = 0
  Verified, // đã xác thực email
  Banned // bị khóa
}
// type of token
export enum tokenType {
  AccessToken,
  RefreshToken,
  EmailVerifyToken,
  ResetPasswordToken
}
