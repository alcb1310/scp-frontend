export type budgetItemType = {
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

export type createBudgetItemType = {
	uuid: string;
	code: string;
	name: string;
	level: number;
	accumulates: boolean;
	parentUuid: null | string;
};
