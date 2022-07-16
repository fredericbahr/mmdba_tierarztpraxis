export interface ITreatmentSearchQuery {
  connector?: ITreatmentSearchOuterConnector;
  queries: ITreatmentSingleQuery[];
}

export interface ITreatmentSingleQuery {
  field: string;
  value: string;
  condition: ITreatmentSearchCondition | undefined;
  connector?: ITreatmentSearchInnerConnector;
}

export type ITreatmentSearchCondition =
  | "IS"
  | "IS_NOT"
  | "IS_LESS_THAN"
  | "IS_LESS_THAN_OR_EQUAL"
  | "IS_GREATER_THAN"
  | "IS_GREATER_THAN_OR_EQUAL";

export type ITreatmentSearchOuterConnector = "AND" | "OR";

export type ITreatmentSearchInnerConnector =
  | "AND"
  | "OR"
  | "AND NOT"
  | "OR NOT";
