import {
  baseListModel,
  baseSearchModel,
  messageOutputModel
} from '../../models/BaseModels';

export interface userDataModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;

  affiliationId?: number;
  affiliationName?: string;

  facultyId?: number;
  facultyName?: string;

  departmentId?: number;
  departmentName?: string;

  researcherId?: number;

  roles: string[];
}

export interface userDataListModel extends baseListModel {
  data: userDataModel[];
}

export interface userDataOutputModel
  extends userDataModel,
    messageOutputModel {}

export interface userSearchInputModel extends baseSearchModel {
  firstName?: string;
  lastName?: string;
  //departmentId?: number;
  role?: string;
}
