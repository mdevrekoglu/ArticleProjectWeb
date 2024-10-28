import { messageOutputModel } from '../../../models/BaseModels';

export interface userLogInModel {
  email: string;
  password: string;
  userType: number;
}

export interface userLogInResponseModel extends messageOutputModel {
  token: string;
}
