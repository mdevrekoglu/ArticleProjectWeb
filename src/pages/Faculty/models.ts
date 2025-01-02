import { baseListModel, messageOutputModel } from '../../models/BaseModels';

export interface facultySearchInputModel {
  facultyName: string;
  affiliationIds: number[];
}

export interface facultyDataListModel extends baseListModel {
  data: facultyDataModel[];
}

export interface facultyDataModel {
  id: number;
  facultyName: string;
  affiliationId: number;
  affiliationName: string;
}

export interface facultyDataOutputModel
  extends facultyDataModel,
    messageOutputModel {}

export interface facultyCreateInputModel {
  facultyName: string;
  affiliationId: number;
}

export interface facultyUpdateInputModel {
  id: number;
  facultyName: string;
}
