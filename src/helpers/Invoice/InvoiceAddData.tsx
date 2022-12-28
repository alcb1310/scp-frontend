import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchProjectsAndSuppliers } from '../../api/fetchProjectsAndSuppliers';
import {
	ErrorType,
	GetSuppliersType,
	ProjectType,
	StoreDataType,
	InvoiceDisplayType,
	SaveInvoiceType,
} from '../../types';
import { Loading } from '../../components/Elements/Loading';
import { InvoiceFormData } from '.';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { SecondaryButton } from '../../components/Buttons/SecondaryButton';
import { postRequest } from '../../api/connection';
import { DisplayDetailData } from './';

export const InvoiceAddData = ({ saveInvoice }: { saveInvoice: any }) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [projects, setProjects] = useState<ProjectType[]>([]);
	const [suppliers, setSuppliers] = useState<GetSuppliersType[]>([]);
	const [error, setError] = useState<ErrorType | null>(null);
	const [addedInvoice, setAddedInvoice] = useState<SaveInvoiceType>({
		project: '',
		supplier: '',
		invoice_number: '',
		date: '',
		total: 0,
	});
	const [displayAddDetail, setDisplayAddDetail] = useState<boolean>(false);
	const [invoice, setInvoice] = useState<InvoiceDisplayType | null>(null);

	const storeData = useSelector((state: StoreDataType) => state);

	useEffect(() => {
		fetchProjectsAndSuppliers(
			storeData,
			setIsLoading,
			setProjects,
			setSuppliers
		).catch((err) => console.error(err));
	}, []);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setError(null);
		setAddedInvoice((prevInvoice) => ({ ...prevInvoice, [name]: value }));
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			const invoiceAddResponse = await postRequest(
				'/invoices',
				addedInvoice,
				{
					token: storeData.token,
					type: storeData.type,
				}
			);

			setInvoice(invoiceAddResponse.data.detail);
			setDisplayAddDetail(true);
		} catch (err: any) {
			if (err.response.status === 409)
				setError({
					errorKey: 'code',
					errorDescription: err.response.data.detail,
				});
			else setError(err.response.data.detail);
		}
	};

	const handleAddDetail = () => {};
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
					handleChange={handleChange}
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
					{displayAddDetail && (
						<PrimaryButton
							buttonType={'button'}
							text={'Add Detail'}
							onEvent={handleAddDetail}
						/>
					)}
				</div>
			</form>
			{displayAddDetail && <DisplayDetailData invoice={invoice} />}
		</>
	);

	return display;
};
