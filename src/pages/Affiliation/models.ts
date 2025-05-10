import { baseListModel, messageOutputModel } from '../../models/BaseModels';

export interface affiliationSearchInputModel {
  affiliationName: string;
  city: string;
  address: string;
  country: string;
  organizationType: string;
}

export interface affiliationDataModel {
  id: number;
  affiliationName: string;
  city: string;
  address: string;
  country: string;
  organizationType: string;
}

export interface affiliationDataOutputModel
  extends affiliationDataModel,
    messageOutputModel {}

export interface affiliationDataListModel extends baseListModel {
  data: affiliationDataModel[];
}

export interface affiliationUpdateInputModel {
  id: number;
  affiliationName: string;
  city: string;
  address: string;
  country: string;
  organizationType: string;
  scopusId: number;
}

export interface affiliationCreateInputModel {
  affiliationName: string;
  city: string;
  address: string;
  country: string;
  organizationType: string;
  scopusId: number;
}
