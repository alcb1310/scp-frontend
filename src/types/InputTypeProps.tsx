import { ChangeEventHandler } from 'react';
import { ErrorType } from '.';

export type userInputType = 'text' | 'password' | 'email';
export type userInputTypeProps = {
	label: string;
	error: ErrorType | null;
	inputName: string;
	required: boolean;
	inputType: userInputType;
	onChange: ChangeEventHandler<HTMLInputElement> | undefined;
};
