import { useState } from 'react';
import { PrimaryButton } from '../components/Buttons/PrimaryButton';
import { Budget } from '../components/Transactions/Budget';
import { Invoice } from '../components/Transactions/Invoice';

type activeTransactionType = null | 'budget' | 'invoice';

const Transactions = () => {
	const [activePage, setActivePage] = useState<activeTransactionType>(null);

	const showActivePage =
		activePage === 'budget' ? (
			<Budget />
		) : activePage === 'invoice' ? (
			<Invoice />
		) : (
			<div className='mt-5'>
				<div className='flex justify-center'>
					<div className='container w-2/3'>
						<img
							className='w-full rounded-lg shadow-2xl'
							src='/images/transactions-background.jpg'
							alt='main page'
						/>
					</div>
				</div>
			</div>
		);

	return (
		<section className='grid grid-cols-12 text-indigo-800 px-5 min-h-96 space-x-6 mb-5'>
			<article className='col-span-9'>{showActivePage}</article>
			<aside className='col-span-3 my-3 text-right flex flex-col'>
				<PrimaryButton
					buttonType={'button'}
					text={'Budget'}
					onEvent={() => {
						setActivePage('budget');
					}}
				/>
				<PrimaryButton
					buttonType={'button'}
					text={'Invoice'}
					onEvent={() => {
						setActivePage('invoice');
					}}
				/>
				<hr className='border-b-2 border-indigo-200 mt-5 mb-3' />
				<PrimaryButton
					buttonType={'button'}
					text={'Transactions Home'}
					onEvent={() => {
						setActivePage(null);
					}}
				/>
			</aside>
		</section>
	);
};

export { Transactions };
