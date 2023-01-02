/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { postRequest } from "../../api/connection";
import { StoreDataType } from "../../types";
import { ErrorType } from "../../types/ErrorType";
import PrimaryButton from "../Buttons/PrimaryButton";
import InputElement from "../Inputs/InputElement";

type CreateUserType = {
  email: string;
  password: string;
  name: string;
};

function UserForm({
  handleSubmit,
  error,
  handleChange,
  user,
}: {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  error: ErrorType | null;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  user: CreateUserType;
}) {
  return (
    <form onSubmit={handleSubmit}>
      <InputElement
        label="Email"
        error={error}
        inputName="email"
        required
        inputType="email"
        onChange={handleChange}
        value={"email" in user ? user.email : ""}
        enabled
      />
      <InputElement
        label="Password"
        error={error}
        inputName="password"
        required
        inputType="password"
        onChange={handleChange}
        value={"password" in user ? user.password : ""}
        enabled
      />
      <InputElement
        label="Name"
        error={error}
        inputName="name"
        required
        inputType="text"
        onChange={handleChange}
        value={"name" in user ? user.name : ""}
        enabled
      />

      <PrimaryButton buttonType="submit" text="Submit" onEvent={handleSubmit} />
    </form>
  );
}

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
