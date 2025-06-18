import { baseListModel, messageOutputModel } from "../../models/BaseModels";


export interface majorDisciplineSearchInputModel {
  majorDisciplineName: string;
  departmentIds: number[];
  facultyIds: number[];  
  affiliationIds: number[];
}

export interface majorDisciplineDataListModel extends baseListModel{
  data: majorDisciplineDataModel[];
}  

export interface majorDisciplineDataModel {
  id: number;
  MajorDisciplineName: string;

  departmentId: number;
  departmentName: string;

  facultyId: number;
  facultyName: string;

  affiliationId: number; 
  affiliationName: string;
}

export interface majorDisciplineDataOutputModel
  extends majorDisciplineDataModel,
    messageOutputModel {}


export interface majorDisciplineCreateInputModel {
    majorDisciplineName: string;
    departmentId: number;
  }  

export interface majorDisciplineUpdateInputModel {
    id: number;
    majorDisciplineName: string;
    departmentId: number;
  }  
