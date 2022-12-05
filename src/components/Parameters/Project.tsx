import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getRequest } from '../../api/connection';
import {
	ProjectEditData,
	ProjectAddData,
	ProjectHomeData,
} from '../../helpers/Project';
import { DisplayStatusType, StoreDataType, ProjectType } from '../../types';
import { Loading } from '../Elements/Loading';

const Project = () => {
	const [projects, setProjects] = useState<ProjectType[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [selectedProject, setSelectedProject] = useState<ProjectType | null>(
		null
	);
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

	const editProject = async (projectUuid: string) => {
		setIsLoading(true);
		const project = await getRequest('/projects', projectUuid, {
			token: storeData.token,
			type: storeData.type,
		});
		setSelectedProject(project.data.detail);
		setInfoToDisplay('edit');
		setIsLoading(false);
	};

	const displayValue = isLoading ? (
		<Loading />
	) : infoToDisplay === 'home' ? (
		<ProjectHomeData
			projects={projects}
			addProject={addProject}
			editProject={editProject}
		/>
	) : infoToDisplay === 'add' ? (
		<ProjectAddData saveProject={saveProject} />
	) : selectedProject ? (
		<ProjectEditData saveProject={saveProject} project={selectedProject} />
	) : (
		'Unable to find project'
	);

	return <div className='w-full'>{displayValue}</div>;
};

export { Project };
