import { useSelector } from "react-redux";

const AppEntry = () => {
    const storeData = useSelector((state: any) => state)
    
    return (
        <>
            <h1>AppEntry</h1>
            
            <p>
                Welcome back <span className="text-indigo-800 uppercase">{storeData.name}</span>
            </p>
        </>
    )
}

export { AppEntry }