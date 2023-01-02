export type BudgetItemType = {
  uuid: string;
  code: string;
  name: string;
  level: number;
  accumulates: boolean;
  parent: null | {
    uuid: string;
    code: string;
    name: string;
    level: number;
    accumulates: boolean;
    parentUuid: string;
  };
};

export type CreateBudgetItemType = {
  uuid: string;
  code: string;
  name: string;
  level: number;
  accumulates: boolean;
  parentUuid: null | string;
};
