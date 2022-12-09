import { BudgetItemType, ProjectType } from '.';

export type budgetType = {
	uuid: string;
	initial_quantity: null | number;
	initial_cost: null | number;
	initial_total: number;
	spent_quantity: null | number;
	spent_total: number;
	to_spend_quantity: null | number;
	to_spend_cost: null | number;
	to_spend_total: number;
	updated_budget: number;
	project: ProjectType;
	budget_item: BudgetItemType;
};

export type budgetFormType = {
	uuid: string;
	project_id: string;
	budget_item_id: string;
	quantity: number;
	cost: number;
};
