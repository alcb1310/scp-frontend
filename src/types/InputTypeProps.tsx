/* eslint-disable import/no-cycle */
import { ChangeEventHandler } from "react";
import { ErrorType } from ".";

export type UserInputType = "text" | "password" | "email" | "number" | "date";
export type UserInputTypeProps = {
  label: string;
  error: ErrorType | null;
  inputName: string;
  required: boolean;
  inputType: UserInputType;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  enabled: boolean;
};
