import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getRequest, postRequest } from '../../api/connection';
import { ProjectForm } from '../../helpers/Project';
import { DisplayStatusType, ErrorType, StoreDataType } from '../../types';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { Loading } from '../Elements/Loading';

export type projectType = {
	uuid: string | undefined;
	name: string;
	is_active: boolean;
};

const Project = () => {
	const [projects, setProjects] = useState<projectType[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [infoToDisplay, setInfoToDisplay] =
		useState<DisplayStatusType>('home');
	const storeData: StoreDataType = useSelector(
		(state: StoreDataType) => state
	);

	const fetchData = async () => {
		setIsLoading(true);
		const allProjects = await getRequest('/projects', null, {
			token: storeData.token,
			type: storeData.type,
		});

		setProjects(allProjects.data.detail);

		setIsLoading(false);
	};

	useEffect(() => {
		fetchData().catch((err) => console.error(err));
	}, []);

	const addProject = () => {
		setInfoToDisplay('add');
	};

	const saveProject = async () => {
		await fetchData();
		setInfoToDisplay('home');
	};

	const displayValue = isLoading ? (
		<Loading />
	) : infoToDisplay === 'home' ? (
		<ProjectHomeData projects={projects} addProject={addProject} />
	) : infoToDisplay === 'add' ? (
		<ProjectAddData saveProject={saveProject} />
	) : (
		''
	);

	return <div className='w-full'>{displayValue}</div>;
};

export { Project };

const ProjectHomeData = ({
	projects,
	addProject,
}: {
	projects: projectType[];
	addProject: any;
}) => {
	const projectsInfo = projects.map((project) => {
		return (
			<tr className='hover:bg-indigo-100' key={project.uuid}>
				<td className='border-x-2 p-3'>{project.name}</td>
				<td className='border-x-2 p-3 text-center'>
					<FontAwesomeIcon
						icon={project.is_active ? faCheck : faXmark}
					/>
				</td>
			</tr>
		);
	});

	return (
		<table className='mt-2 mx-auto table-auto'>
			<caption className='text-left text-2xl font-semibold uppercase pb-5'>
				<div className='flex justify-between items-center'>
					<p>Projects</p>
					<div className='text-base'>
						<PrimaryButton
							buttonType={'button'}
							text={'Add'}
							onEvent={addProject}
						/>
					</div>
				</div>
			</caption>
			<thead className='border-b-2 border-black font-bold bg-indigo-200'>
				<tr>
					<th className='text-center p-3'>Name</th>
					<th className='text-center p-3'>Active</th>
				</tr>
			</thead>
			<tbody className='border-b-2'>{projectsInfo}</tbody>
		</table>
	);
};

const ProjectAddData = ({ saveProject }: { saveProject: any }) => {
	const [project, setProject] = useState<projectType>({
		uuid: undefined,
		is_active: false,
		name: '',
	});
	const [error, setError] = useState<ErrorType | null>(null);
	const storeData: StoreDataType = useSelector(
		(state: StoreDataType) => state
	);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			await postRequest('/projects', project, {
				token: storeData.token,
				type: storeData.type,
			});
			saveProject();
		} catch (err: any) {
			if (err.response.status === 409)
				setError({
					errorKey: 'name',
					errorDescription: err.response.data.detail,
				});
			else setError(err.response.data.detail);
			console.error(err);
		}
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value, checked } = event.target;

		setError(null);

		const changeValue = name === 'is_active' ? checked : value;
		setProject((prevProject) => ({ ...prevProject, [name]: changeValue }));
	};

	return (
		<form onSubmit={handleSubmit}>
			<ProjectForm
				error={error}
				onChange={handleChange}
				project={project}
			/>
			<PrimaryButton
				buttonType={'submit'}
				text={'Submit'}
				onEvent={handleSubmit}
			/>
		</form>
	);
};
