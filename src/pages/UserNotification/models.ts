import { baseListModel } from '../../models/BaseModels';

export interface notificationUserDataModel {
  isRead: boolean;
  title: string;
  description: string;
  createdDate: Date;
}

export interface notificationUserDataListModel extends baseListModel {
  data: notificationUserDataModel[];
}
