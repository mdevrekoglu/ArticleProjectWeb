import { baseListModel, messageOutputModel } from '../../models/BaseModels';

export interface researcherDataListModel extends baseListModel {
  data: researcherDataModel[];
}

export interface researcherDataOutputModel
  extends researcherDataModel,
    messageOutputModel {}

export interface researcherDataModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  documentCount?: number;
  position: string;
  staffTitle: string;

  affiliationId: number;
  affiliationName: string;

  woSId: string;
  orcId: string;
  scopusId: number;

  isActive: boolean;
}

export interface researcherSearchInputModel {
  isActive?: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;

  position?: string;
  staffTitle?: string;

  affiliationId?: number;

  woSId?: string;
  orcId?: string;
  scopusId?: number;
}
