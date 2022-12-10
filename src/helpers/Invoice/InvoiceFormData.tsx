import { ErrorType, GetSuppliersType, ProjectType } from '../../types';
import { InputElement, SelectElement } from '../../components/Inputs';
import { saveInvoiceType } from '../../components/Transactions/Invoice';

export const InvoiceFormData = ({
	addedInvoice,
	error,
	handleChange,
	projects,
	suppliers,
}: {
	addedInvoice: saveInvoiceType;
	error: ErrorType | null;
	handleChange: any;
	projects: ProjectType[];
	suppliers: GetSuppliersType[];
}) => {
	const projectsOptions = projects.map((project) => (
		<option key={project.uuid} value={project.uuid}>
			{project.name}
		</option>
	));

	const suppliersOptions = suppliers.map((supplier) => (
		<option key={supplier.uuid} value={supplier.uuid}>
			{supplier.name}
		</option>
	));

	return (
		<>
			<SelectElement
				label={'Project'}
				error={error}
				inputName={'project'}
				required={true}
				value={addedInvoice.project}
				onChange={handleChange}
			>
				{projectsOptions}
			</SelectElement>
			<SelectElement
				label={'Supplier'}
				error={error}
				inputName={'supplier'}
				required={true}
				value={addedInvoice.supplier}
				onChange={handleChange}
			>
				{suppliersOptions}
			</SelectElement>
			<InputElement
				label={'Invoice Number'}
				error={error}
				inputName={'invoice_number'}
				required={true}
				inputType={'text'}
				onChange={handleChange}
				value={addedInvoice.invoice_number}
				enabled={true}
			/>
			<InputElement
				label={'Invoice Date'}
				error={error}
				inputName={'date'}
				required={true}
				inputType={'date'}
				onChange={handleChange}
				value={addedInvoice.date}
				enabled={true}
			/>
			<InputElement
				label={'Total'}
				error={error}
				inputName={'total'}
				required={false}
				inputType={'number'}
				onChange={handleChange}
				value={addedInvoice.total}
				enabled={false}
			/>
		</>
	);
};
