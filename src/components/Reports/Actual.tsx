import { ChangeEvent, useEffect, useState } from 'react';
import { BudgetType, ProjectType, StoreDataType } from '../../types';
import { SelectElement } from '../Inputs';
import { useSelector } from 'react-redux';
import {
	SERVER,
	downloadFileWithQueryString,
	getProjects,
	getRequestWithQueryString,
} from '../../api/connection';
import { Loading } from '../Elements/Loading';
import { queryParamsType } from '../../types/queryParamsType';
import { PrimaryButton } from '../Buttons/PrimaryButton';

const Actual = () => {
	const [hasData, setHasData] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [projects, setProjects] = useState<ProjectType[]>([]);
	const [selectedProject, setSelectedProject] = useState<string>('');
	const [budgets, setBudgets] = useState<BudgetType[]>([]);
	const [level, setLevel] = useState<number>(4);

	const storeData = useSelector((state: StoreDataType) => state);

	const loadProjects = async () => {
		setIsLoading(true);
		const params: queryParamsType[] = [
			{
				key: 'active',
				value: 'true',
			},
		];
		const projectsData = await getRequestWithQueryString(
			'/projects',
			params,
			{ token: storeData.token, type: storeData.type }
		);
		setProjects(projectsData.data.detail);
		setIsLoading(false);
	};

	const loadBudget = async () => {
		setIsLoading(true);
		const params: queryParamsType[] = [
			{
				key: 'project',
				value: selectedProject,
			},
			{
				key: 'level',
				value: level,
			},
		];
		const selectedBudget = await getRequestWithQueryString(
			'/budgets',
			params,
			{ token: storeData.token, type: storeData.type }
		);

		setBudgets(selectedBudget.data.detail);
		setIsLoading(false);
	};

	useEffect(() => {
		loadProjects();
	}, []);

	const projectOptions = projects.map((project) => {
		return (
			<option value={project.name} key={project.uuid}>
				{project.name}
			</option>
		);
	});

	const handleProjectChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setSelectedProject(value);
	};

	const handleLevelChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.value === '') setLevel(4);
		setLevel(parseInt(event.target.value));
	};

	useEffect(() => {
		if (selectedProject === '') {
			setHasData(false);
			return;
		}
		loadBudget();
		setHasData(true);
	}, [selectedProject, level]);

	const handleExcelClick = async () => {
		const params: queryParamsType[] = [
			{
				key: 'project',
				value: selectedProject,
			},
			{
				key: 'level',
				value: level,
			},
		];
		// const result = fetch(`${SERVER}/excel/budgets`, {
		// 	method: 'get',
		// 	headers: new Headers({
		// 		Authorization: `${storeData.type} ${storeData.token}`,
		// 	}),
		// })
		// 	.then((res) => res.blob())
		// 	.then((blob) => {
		// 		const _url = window.URL.createObjectURL(blob);
		// 		window.open(_url, 'blank');
		// 	})
		// 	.catch((err) => {
		// 		console.error(err);
		// 	});

		await downloadFileWithQueryString('/excel/budgets', params, {
			type: storeData.type,
			token: storeData.token,
		});
	};

	const budgetDisplayData = budgets.map((budget) => {
		return (
			<tr
				key={budget.uuid}
				className={
					budget.budget_item.accumulates ? 'font-bold' : 'font-normal'
				}
			>
				<td>{budget.budget_item.code}</td>
				<td>{budget.budget_item.name}</td>
				<td className='text-right'>
					{budget.spent_quantity === null
						? null
						: budget.spent_quantity.toFixed(2)}
				</td>
				<td className='text-right'>{budget.spent_total.toFixed(2)}</td>
				<td className='text-right'>
					{budget.to_spend_quantity === null
						? null
						: budget.to_spend_quantity.toFixed(2)}
				</td>
				<td className='text-right'>
					{budget.to_spend_cost === null
						? null
						: budget.to_spend_total.toFixed(2)}
				</td>
				<td className='text-right'>
					{budget.to_spend_total.toFixed(2)}
				</td>
				<td className='text-right'>
					{budget.updated_budget.toFixed(2)}
				</td>
			</tr>
		);
	});

	const showResults = hasData && (
		<table className='mt-2 mx-auto table-auto'>
			<thead className='border-b-2 border-black font-bold bg-indigo-200'>
				<tr>
					<th colSpan={2} className='text-center p-3'>
						Budget Item
					</th>
					<th colSpan={2} className='text-center p-3'>
						Spent
					</th>
					<th colSpan={3} className='text-center p-3'>
						To Spend
					</th>
					<th rowSpan={2} className='text-center p-3'>
						Total
					</th>
				</tr>
				<tr>
					<th className='text-center p-3'>Code</th>
					<th className='text-center p-3'>Name</th>
					<th className='text-center p-3'>Quantity</th>
					<th className='text-center p-3'>Total</th>
					<th className='text-center p-3'>Quantity</th>
					<th className='text-center p-3'>Cost</th>
					<th className='text-center p-3'>Total</th>
				</tr>
			</thead>
			<tbody>{budgetDisplayData}</tbody>
		</table>
	);

	const infoToDisplay = isLoading ? (
		<Loading />
	) : (
		<>
			<h1 className='text-center text-3xl font-bold mt-5'>
				Current Budget
			</h1>
			<SelectElement
				label={'Project'}
				error={null}
				inputName={'project'}
				required={true}
				value={selectedProject}
				onChange={handleProjectChange}
			>
				{projectOptions}
			</SelectElement>
			<SelectElement
				label={'Level'}
				error={null}
				inputName={'laber'}
				required={true}
				value={level}
				onChange={handleLevelChange}
			>
				<option value={1}>1</option>
				<option value={2}>2</option>
				<option value={3}>3</option>
				<option value={4}>4</option>
			</SelectElement>
			{hasData && (
				<PrimaryButton
					buttonType={'button'}
					text={'Excel'}
					onEvent={handleExcelClick}
				/>
			)}
			{showResults}
		</>
	);

	return <>{infoToDisplay}</>;
};

export { Actual };
