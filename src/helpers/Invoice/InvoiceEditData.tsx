import { FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchProjectsAndSuppliers } from '../../api/fetchProjectsAndSuppliers';
import {
	ErrorType,
	GetSuppliersType,
	ProjectType,
	StoreDataType,
	InvoiceDisplayType,
	SaveInvoiceType,
	SaveInvoiceDetailType,
} from '../../types';
import { InvoiceDetailModal, InvoiceFormData } from '../../helpers/Invoice';
import { DisplayDetailData } from './';
import { Loading } from '../../components/Elements/Loading';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { SecondaryButton } from '../../components/Buttons/SecondaryButton';
import { postRequest } from '../../api/connection';

export const InvoiceEditData = ({
	saveInvoice,
	selectedInvoice,
}: {
	saveInvoice: any;
	selectedInvoice: InvoiceDisplayType | null;
}) => {
	if (!selectedInvoice) return <h1>ERROR</h1>;
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [projects, setProjects] = useState<ProjectType[]>([]);
	const [suppliers, setSuppliers] = useState<GetSuppliersType[]>([]);
	const [error, setError] = useState<ErrorType | null>(null);
	const [addedInvoice, setAddedInvoice] = useState<SaveInvoiceType>({
		project: selectedInvoice.project.uuid,
		supplier: selectedInvoice.supplier.uuid,
		invoice_number: selectedInvoice.invoice_number,
		date: selectedInvoice.date,
		total: selectedInvoice.total,
	});
	const [showModal, setShowModal] = useState<boolean>(false);

	const storeData = useSelector((state: StoreDataType) => state);

	useEffect(() => {
		fetchProjectsAndSuppliers(
			storeData,
			setIsLoading,
			setProjects,
			setSuppliers
		).catch((err) => console.error(err));
	}, []);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	const toggleDetailModal = () => {
		setShowModal((prevModal) => !prevModal);
	};

	const handleClose = () => {
		saveInvoice();
	};

	const display = isLoading ? (
		<Loading />
	) : (
		<>
			<form onSubmit={handleSubmit}>
				<InvoiceFormData
					addedInvoice={addedInvoice}
					error={error}
					handleChange={undefined}
					projects={projects}
					suppliers={suppliers}
				/>
				<div className='flex justify-between'>
					<div>
						<PrimaryButton
							buttonType={'submit'}
							text={'Submit'}
							onEvent={handleSubmit}
						/>
						<SecondaryButton
							buttonType={'button'}
							text={'Close'}
							onEvent={handleClose}
						/>
					</div>
					<PrimaryButton
						buttonType={'button'}
						text={'Add Detail'}
						onEvent={toggleDetailModal}
					/>
				</div>
			</form>
			<DisplayDetailData invoice={selectedInvoice} />
			{showModal && (
				<InvoiceDetailModal
					toggleDetailModal={toggleDetailModal}
					invoice={selectedInvoice}
				/>
			)}
		</>
	);

	return display;
};
