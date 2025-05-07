import { baseListModel } from '../../models/BaseModels';

export interface articleSearchInputModel {
  title?: string;
  affiliationId?: number;
  publishYear?: number;
  doi?: string;
  journalIds?: number[];
  researcherIds?: number[];
}

export interface articleDataModel {
  scopusId: number;
  eid: string;
  title: string;
  creator: string;
  publicationName: string;
  issn: string;
  eissn: string;
  volume: string;
  issue: string;
  pageRange: string;
  coverDate: string;
  doi: string;
  citedByCount: number;
  affiliationName: string;
}

export interface articleDataListModel extends baseListModel {
  data: articleDataModel[];
}
