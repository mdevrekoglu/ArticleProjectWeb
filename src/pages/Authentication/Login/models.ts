import { messageOutputModel } from '../../../models/BaseModels';

export interface userLogInModel {
  email: string;
  password: string;
  userType: number;
  rememberMe: boolean;
}

export interface userLogInResponseModel extends messageOutputModel {
  token: string;
  refreshToken: string;
}

export interface userTokenInputModel {
  token: string;
  refreshToken: string;
}

export interface userTokenOutputModel extends messageOutputModel {
  token: string;
  refreshToken: string;
}
