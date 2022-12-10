import { getProjects, getSuppliers } from './connection';
import { StoreDataType } from "../types";

export const fetchProjectsAndSuppliers = async (storeData: StoreDataType, setIsLoading: any, setProjects: any, setSuppliers: any) => {
    setIsLoading(true)

    const [projects, suppliers] = await Promise.all([
        getProjects(storeData),
        getSuppliers(storeData)
    ])
	setProjects(projects.data.detail);
    setSuppliers(suppliers.data.detail)

    setIsLoading(false)
}