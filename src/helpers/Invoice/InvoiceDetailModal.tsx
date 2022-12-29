import { useSelector } from 'react-redux';
import {
	BudgetItemType,
	ErrorType,
	InvoiceDisplayType,
	SaveInvoiceDetailType,
	StoreDataType,
} from '../../types';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useGetTransactionalBudgetItems } from '../../hooks';
import { InputElement, SelectElement } from '../../components/Inputs';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { SecondaryButton } from '../../components/Buttons/SecondaryButton';
import { Loading } from '../../components/Elements/Loading';
import { postRequest } from '../../api/connection';

export const InvoiceDetailModal = ({
	toggleDetailModal,
	invoice,
}: {
	toggleDetailModal: VoidFunction;
	invoice: InvoiceDisplayType | null;
}) => {
	if (!invoice) return <h3>ERROR</h3>;
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const storeData = useSelector((state: StoreDataType) => state);
	const [error, setError] = useState<ErrorType | null>(null);
	const [invoiceDetail, setInvoiceDetail] = useState<SaveInvoiceDetailType>({
		budgetItemUUID: '',
		quantity: 0,
		cost: 0,
	});
	const [total, setTotal] = useState<number>(0);

	const budgetItems: BudgetItemType[] = useGetTransactionalBudgetItems(
		storeData,
		setIsLoading
	);
	const budgetItemsData = budgetItems.map((budgetItem) => (
		<option key={budgetItem.uuid} value={budgetItem.uuid}>
			{budgetItem.name}
		</option>
	));

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		const saveValue =
			name === 'quantity' || name === 'cost' ? parseFloat(value) : value;

		setInvoiceDetail((prevInvoiceDetail) => ({
			...prevInvoiceDetail,
			[name]: saveValue,
		}));
	};

	useEffect(() => {
		setTotal(invoiceDetail.quantity * invoiceDetail.cost);
	}, [invoiceDetail]);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		console.log(typeof invoiceDetail.quantity);

		try {
			await postRequest(
				`/invoices/${invoice.uuid}/details`,
				invoiceDetail,
				{
					token: storeData.token,
					type: storeData.type,
				}
			);
		} catch (err: any) {
			console.error(err);
			setError(err.response.data.detail);
		}
	};

	const display = isLoading ? (
		<Loading />
	) : (
		<>
			<div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
				<div className='relative w-auto my-6 mx-auto max-w-3xl'>
					{/*content*/}
					<div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none px-4'>
						{/*header*/}
						<div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
							<h3 className='text-3xl font-semibold'>
								Add Invoice Detail
							</h3>
							<button
								className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
								onClick={toggleDetailModal}
							>
								<span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
									×
								</span>
							</button>
						</div>
						{/*body*/}
						<form onSubmit={handleSubmit}>
							<SelectElement
								label={'Budget Items'}
								error={error}
								inputName={'budgetItemUUID'}
								required={true}
								value={invoiceDetail.budgetItemUUID}
								onChange={handleChange}
							>
								{budgetItemsData}
							</SelectElement>
							<InputElement
								label={'Quantity'}
								error={error}
								inputName={'quantity'}
								required={true}
								inputType={'number'}
								onChange={handleChange}
								value={invoiceDetail.quantity}
								enabled={true}
							/>
							<InputElement
								label={'Cost'}
								error={error}
								inputName={'cost'}
								required={true}
								inputType={'number'}
								onChange={handleChange}
								value={invoiceDetail.cost}
								enabled={true}
							/>
							<InputElement
								label={'Total'}
								error={error}
								inputName={'total'}
								required={false}
								inputType={'number'}
								onChange={handleChange}
								value={total}
								enabled={false}
							/>
						</form>
						{/*footer*/}
						<div className='flex items-center justify-end pb-3 border-t border-solid border-slate-200 rounded-b'>
							<SecondaryButton
								buttonType={'button'}
								text={'Close'}
								onEvent={toggleDetailModal}
							/>
							<PrimaryButton
								buttonType={'button'}
								text={'Submit'}
								onEvent={handleSubmit}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
		</>
	);

	return display;
};
