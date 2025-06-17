import { baseListModel } from '../../models/BaseModels';

export interface collaboratorSearchModel {
  text?: string;
}

export interface collaboratorDataModel {
  id?: number;
  name: string;
  wosId: string;
  similarity: number;
  articleCount: number;
}

export interface collaboratorDataListModel extends baseListModel {
  data: collaboratorDataModel[];
}
