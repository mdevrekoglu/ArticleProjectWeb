export interface userRequestModel {
  email: string;
  userType: number;
}

export interface userPasswordResetModel {
  email: string;
  password: string;
  token: string;
}

export interface userChangePasswordModel {
  email: string;
  password: string;
  newPassword: string;
}

export interface userConfirmEmailModel {
  email: string;
  token: string;
}
