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
