/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getRequest } from "../api/connection";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import Loading from "../components/Elements/Loading";
import ChangePassword from "../components/Users/ChangePassword";
import CreateUser from "../components/Users/CreateUser";
import EditUser from "../components/Users/EditUser";

type UserActivePageType = "create" | "update" | "reset" | null;
type GetUserType = {
  uuid: string;
  email: string;
  name: string;
  company: {
    uuid: string;
    ruc: string;
    name: string;
    employees: number;
  };
};

function UsersMain() {
  const [activePage, setActivePage] = useState<UserActivePageType>(null);
  const [users, setUsers] = useState<GetUserType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedUserUuid, setSelectedUserUuid] = useState<string>("");
  const storeData = useSelector((state: any) => state);

  const getAllUsers = async (): Promise<AxiosResponse> => {
    setIsLoading(true);
    const usersResponse: AxiosResponse = await getRequest("/users", null, {
      token: storeData.token,
      type: storeData.type,
    });
    setIsLoading(false);
    return usersResponse;
  };

  useEffect(() => {
    getAllUsers().then((data) => {
      setUsers(data.data.detail);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSuccess = async () => {
    setActivePage(null);

    const userResponse = await getAllUsers();
    setUsers(userResponse.data.detail);
  };

  const usersEl = users.map((user: GetUserType) => {
    return (
      <tr
        className="hover:bg-indigo-100"
        key={user.uuid}
        onClick={() => {
          setActivePage("update");
          setSelectedUserUuid(user.uuid);
        }}
      >
        <td className="border-x-2 p-3">{user.email}</td>
        <td className="border-x-2 p-3">{user.name}</td>
      </tr>
    );
  });

  const showPage = isLoading ? (
    <Loading />
  ) : activePage === "reset" ? (
    <ChangePassword />
  ) : activePage === "create" ? (
    <CreateUser successEvent={handleSuccess} />
  ) : activePage === "update" ? (
    <EditUser userUuid={selectedUserUuid} />
  ) : (
    <div className="w-full">
      <table className="mt-4 mx-auto">
        <thead className="border-b-2 border-black font-bold bg-indigo-200">
          <tr>
            <td className="text-center w-4/12 p-3">Email</td>
            <td className="text-center w-4/12 p-3">Name</td>
          </tr>
        </thead>
        <tbody className="border-b-2">{usersEl}</tbody>
      </table>
    </div>
  );

  return (
    <section className="grid grid-cols-12 text-indigo-800 px-5 min-h-96 space-x-6 mb-5">
      <article className="col-span-9">{showPage}</article>
      <aside className="col-span-3 my-3 text-right flex flex-col">
        <PrimaryButton
          buttonType="button"
          text="Change Password"
          onEvent={() => {
            setActivePage("reset");
          }}
        />
        <PrimaryButton
          buttonType="button"
          text="Create User"
          onEvent={() => {
            setActivePage("create");
          }}
        />
        <hr className="border-b-2 border-indigo-200 mt-5 mb-3" />
        <PrimaryButton
          buttonType="button"
          text="User home"
          onEvent={() => {
            setActivePage(null);
          }}
        />
      </aside>
    </section>
  );
}

export default UsersMain;
