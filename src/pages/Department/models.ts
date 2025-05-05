import { baseListModel, messageOutputModel } from '../../models/BaseModels';

export interface departmentSearchInputModel {
    departmentName: string;
    facultyIds: number[];
    affiliationIds: number[];
  }

export interface departmentDataListModel extends baseListModel {
  data: departmentDataModel[];
}  

export interface departmentDataModel {
    id: number;
    departmentName: string;
    studentCount: number;
    researcherCount: number;

    facultyId: number;
    facultyName: string;

    affiliationId: number;
    affiliationName: string;
  }

export interface departmentDataOutputModel
  extends departmentDataModel,
    messageOutputModel {}

export interface departmentCreateInputModel {
    departmentName: string;
    studentCount: number;
    researcherCount: number;

    facultyId: number;
  }    


export interface departmentUpdateInputModel {
    id: number;
    departmentName: string;
    studentCount: number;
    researcherCount: number;
  }
