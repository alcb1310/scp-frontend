/* eslint-disable no-console */
import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { putRequest } from "../../api/connection";
import { ErrorType } from "../../types/ErrorType";
import InputElement from "../Inputs/InputElement";
import { StoreDataType } from "../../types";
import PrimaryButton from "../Buttons/PrimaryButton";

type ChangePasswordType = {
  password1: string;
  password2: string;
};

export default function ChangePassword() {
  const [error, setError] = useState<ErrorType | null>(null);
  const [password, setPassword] = useState<ChangePasswordType>({
    password1: "",
    password2: "",
  });
  const storeData: StoreDataType = useSelector((state: StoreDataType) => state);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setPassword((prevPassword) => ({ ...prevPassword, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!("password1" in password)) {
      setError({
        errorKey: "password1",
        errorDescription: "Required field",
      });
      return;
    }
    if (!("password2" in password)) {
      setError({
        errorKey: "password2",
        errorDescription: "Required field",
      });
      return;
    }

    if (password.password1 !== password.password2) {
      setError({
        errorKey: "password1",
        errorDescription: `Passwords don't match`,
      });
    }

    try {
      await putRequest(
        "/users",
        storeData.uuid,
        { password: password.password1 },
        { token: storeData.token, type: storeData.type }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <InputElement
          label="Password"
          error={error}
          inputName="password1"
          required
          inputType="password"
          onChange={handleChange}
          value={"password1" in password ? password.password1 : ""}
          enabled
        />
        <InputElement
          label="Repeat Password"
          error={error}
          inputName="password2"
          required
          inputType="password"
          onChange={handleChange}
          value={"password2" in password ? password.password2 : ""}
          enabled
        />
        <PrimaryButton
          buttonType="submit"
          text="Submit"
          onEvent={handleSubmit}
        />
      </form>
    </>
  );
}
