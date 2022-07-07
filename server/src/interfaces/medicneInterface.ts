export interface IMedicneAdvancedSearchRequest {
  keywords: IMedicineKeywordSearch[];
}

export interface IMedicineKeywordSearch {
  keyword: string;
  operator: ISearchOperator | undefined;
}

type ISearchOperator = "&" | "|" | "<->";
