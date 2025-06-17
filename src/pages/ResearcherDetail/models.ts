import { messageOutputModel } from '../../models/BaseModels';
import { researcherDataModel } from '../Researcher/models';
import { articleDataModel } from '../SearchArticle/models';

export interface researcherDetailDataOutputModel
  extends researcherDetailDataModel,
    messageOutputModel {}

export interface researcherDetailDataModel extends researcherDataModel {
  articles: articleDataModel[];
  userId?: string;
  image?: string;
}
