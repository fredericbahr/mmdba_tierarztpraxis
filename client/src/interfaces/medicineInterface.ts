export interface IMedicine {
  id: number;
  name: string;
  dosis: number;
  description: string;
  blob: Blob;
}

export interface IMedicneAdvancedSearchKeyword {
  keyword: string;
  operator: ISearchOperator | undefined;
}

export type ISearchOperator = "&" | "|" | "<->";

export type ISearchTarget = "name" | "description";
