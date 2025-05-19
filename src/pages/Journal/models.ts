import { baseListModel, messageOutputModel } from '../../models/BaseModels';

export interface journalSearchInputModel {
    name: string;
    abbreviationName: string;
    issn: string;
    eissn: string;
    year: number;
    categoryId: number;
  }
  
export interface journalDataListModel extends baseListModel {
    data: journalDataModel[];
  }  

export interface journalDataModel {
    id: number;
    name: string;
    abbreviationName: string;
    issn: string;
    eissn: string;
    jif: number;
    jif5years: number;
    categorId: number;
    categoryName: string;
    year: number;
  }

export interface journalDataOutputModel
    extends journalDataModel,
      messageOutputModel {}


export interface journalCreateInputModel {
    name: string;
    abbreviationName: string;
    issn: string;
    eissn: string;
    jif: number;
    jif5years: number;

    //category fields
    categoryName: string;
    quartile: number;
    rank: number;
    totalJournals: number;
    //
    year: number;
  }    

  export interface journalUpdateInputModel {
    id: number;
    name: string;
    abbreviationName: string;
    issn: string;
    eissn: string;
    jif: number;
    jif5years: number;

    //categoryId: number;
    categoryName: string;
    quartile: number;
    rank: number;
    totalJournals: number;

    year: number;
  }