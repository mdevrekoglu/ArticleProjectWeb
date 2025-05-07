export interface messageOutputModel {
  messages: string[];
  isSuccessed: boolean;
}

export interface baseSearchModel {
  pageIndex: number;
  pageSize: number;
  sortingColumn: string;
  sortingType: string;
}

export interface baseListModel extends messageOutputModel {
  count: number;
}

export interface keyInputModel {
  id: number;
}

export interface BaseGetOptionsByKeywordModel {
  keyword: string;
  optionsSize?: number;
}

export interface BaseGetOptionsOutputModel {
  id: number;
  name: string;
}
