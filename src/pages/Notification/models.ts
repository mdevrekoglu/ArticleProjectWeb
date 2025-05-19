import {
  baseListModel,
  baseSearchModel,
  messageOutputModel
} from '../../models/BaseModels';

export interface notificationSearchInputModel extends baseSearchModel {
  title: string;
  isActive: boolean;
  startDate: Date;
  endDate: Date;
}

export interface notificationDataListModel extends baseListModel {
  data: notificationDataModel[];
}

export interface notificationDataModel {
  id: number;
  title: string;
  description: string;
  isActive: boolean;
  createdDate: Date;

  targets: notificationTargetDataModel[];
}

export interface notificationTargetDataModel {
  userId: string;
  name: string;
  isRead: boolean;
}

export interface notificationDataOutputModel
  extends notificationDataModel,
    messageOutputModel {}

export interface notificationCreateInputModel {
  title: string;
  description: string;
  userIds: string[];
}

export interface notificationUpdateInputModel {
  id: number;
  title: string;
  description: string;
  userIds: string[];
}

export interface UserOptionsSearchInputModel {
  affiliationId?: number;
  facultyId?: number;
  departmentId?: number;
}
