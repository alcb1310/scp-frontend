import { useSelector } from "react-redux";
import { StoreDataType } from "../types";

function AppEntry() {
  const storeData: StoreDataType = useSelector((state: StoreDataType) => state);

  return (
    <div className="container px-5 py-5">
      <p className="text-gray-800">
        Welcome back{" "}
        <span className="text-indigo-800 uppercase">{storeData.name}</span>
      </p>
      <div className="flex justify-center">
        <div className="container w-2/3">
          <img
            className="w-full rounded-lg shadow-2xl"
            src="/images/register-background.jpg"
            alt="main page"
          />
        </div>
      </div>
    </div>
  );
}

export default AppEntry;
