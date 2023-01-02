import { ChangeEvent, FormEvent } from "react";
import { CreateUserType } from "../../types";
import { ErrorType } from "../../types/ErrorType";
import PrimaryButton from "../Buttons/PrimaryButton";
import InputElement from "../Inputs/InputElement";

export default function UserForm({
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
