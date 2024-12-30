import { baseListModel } from '../../models/BaseModels';

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
