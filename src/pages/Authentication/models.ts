export interface userRequestModel {
  email: string;
  userType: number;
}

export interface userChangePasswordModel {
  email: string;
  password: string;
  newPassword: string;
}
