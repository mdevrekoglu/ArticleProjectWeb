import { messageOutputModel } from './BaseModels';

export interface UserModel {
  userFirstName: string;
  userLastName: string;
  userId: string;
  userEmail: string;
  roles: string[];
  exp: number;
  iss: string;
  aud: string;
}

export interface UserCredentialsModel extends messageOutputModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  departmentName: string;
  facultyName: string;
  affiliationName: string;
}
