import { BudgetItemType, GetSuppliersType, ProjectType } from '.';

export type invoiceDisplayType = {
	uuid: string;
	invoice_number: string;
	date: string;
	total: number;
	project: ProjectType;
	supplier: GetSuppliersType;
};

export type saveInvoiceType = {
	project: string;
	supplier: string;
	invoice_number: string;
	date: string;
	total: number;
};
export type invoiceDetailType = {
	uuid: string;
	quantity: number;
	cost: number;
	total: number;
	budgetItem: BudgetItemType;
};
