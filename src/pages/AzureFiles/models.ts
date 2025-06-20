import { baseListModel } from '../../models/BaseModels';
import { FileTypeEnum } from './enums';

export interface azureFileSearchInputModel {
  fileName?: string;
  fileGUID?: string;
  fileType?: FileTypeEnum;
  createdBy?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface azureFileListDataModel {
  id: number;
  fileName: string;
  fileGUID: string;
  description: string;
  fileType: FileTypeEnum;
  createdDate: Date;

  userId: string;
  userName: string;
}

export interface azureFileListOutputModel extends baseListModel {
  data: azureFileListDataModel[];
}
