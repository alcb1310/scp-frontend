import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  FormEvent,
} from "react";
import { useSelector } from "react-redux";
import { isAxiosError } from "axios";
import { ErrorType, StoreDataType, UpdateUserType } from "../../types";
import { getRequest } from "../../api/getRequest";
import Loading from "../Elements/Loading";
import UserForm from "./UserForm";
import putRequest from "../../api/putRequest";

async function getSelectedUser(
  userUuid: string,
  setUser: Dispatch<SetStateAction<UpdateUserType>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  storeData: StoreDataType
) {
  setIsLoading(true);

  const selectedUser = await getRequest("/users", userUuid, {
    token: storeData.token,
    type: storeData.type,
  });

  setUser(selectedUser.data.detail);

  setIsLoading(false);
}

export default function EditUser({
  userUuid,
}: {
  userUuid: string;
}): JSX.Element {
  const [user, setUser] = useState<UpdateUserType>({
    uuid: "",
    email: "",
    password: "",
    name: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType | null>(null);

  const storeData = useSelector((state: StoreDataType) => state);

  useEffect(() => {
    getSelectedUser(userUuid, setUser, setIsLoading, storeData);
  }, [storeData, userUuid]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let userToUpdate: {
      email: string;
      name: string;
      password: string | undefined;
    } = {
      email: user.email,
      name: user.name,
      password: undefined,
    };

    if (user.password !== undefined && user.password !== "") {
      // update user with out updating the password
      userToUpdate = { ...userToUpdate, password: user.password };
    }

    try {
      await putRequest("/users", user.uuid, userToUpdate, {
        token: storeData.token,
        type: storeData.type,
      });
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        if (err.response?.status === 409) {
          setError({
            errorKey: "email",
            errorDescription: "Email already exists",
          });
        }
      } else {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setError(null);
    setUser((prevUser: UpdateUserType) => ({ ...prevUser, [name]: value }));
  };

  const userFormDisplay: JSX.Element = user ? (
    <UserForm
      handleSubmit={handleSubmit}
      error={error}
      handleChange={handleChange}
      user={user}
    />
  ) : (
    <p>Unable to find user</p>
  );

  const displayData: JSX.Element = isLoading ? (
    <Loading />
  ) : (
    <>
      <h1>TEST</h1>
      {userFormDisplay}
    </>
  );

  return displayData;
}
