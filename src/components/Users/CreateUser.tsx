/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { postRequest } from "../../api/connection";
import { StoreDataType, CreateUserType } from "../../types";
import { ErrorType } from "../../types/ErrorType";
import UserForm from "./UserForm";

export default function CreateUser(props: { successEvent: any }) {
  const [error, setError] = useState<ErrorType | null>(null);
  const [user, setUser] = useState<CreateUserType>({
    email: "",
    password: "",
    name: "",
  });
  const storeData: StoreDataType = useSelector((state: StoreDataType) => state);

  const { successEvent } = props;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await postRequest("/users", user, {
        token: storeData.token,
        type: storeData.type,
      });

      successEvent();
    } catch (err: any) {
      if (err.response.status === 400) setError(err.response.data.detail);
      if (err.response.status === 403)
        setError({
          errorKey: "email",
          errorDescription: err.response.data.detail,
        });
      if (err.response.status === 409)
        setError({
          errorKey: "email",
          errorDescription: err.response.data.detail,
        });
    }
  };

  return (
    <>
      <h2 className="mt-4 text-lg uppercase font-semibold font-sans">
        Create User
      </h2>
      <UserForm
        handleSubmit={handleSubmit}
        error={error}
        handleChange={handleChange}
        user={user}
      />
    </>
  );
}
