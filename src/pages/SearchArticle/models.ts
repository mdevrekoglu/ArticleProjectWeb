import { baseListModel } from '../../models/BaseModels';

export interface articleSearchModel {
  title?: string;
  affiliationId?: number;
}

export interface articleDataListModel extends baseListModel {}
