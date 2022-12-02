import { UserInputTypeProps } from '../../types';

const InputElement = (props: UserInputTypeProps) => {
	const { label, error, inputName, required, inputType, value, onChange } = props;

	return (
		<>
			<label className='block mt-4 mb-2 text-indigo-700' htmlFor={inputName}>
				{label} {required && <span className='text-red-600'>*</span>}
			</label>
			<input
				name={inputName}
				id={inputName}
				onChange={onChange}
				required={required}
				placeholder={label}
				type={inputType}
				className={`block rounded-md w-full text-indigo-700 focus:border-indigo-700 focus:ring-indigo-700 ${
					error !== null &&
					error.errorKey === inputName &&
					'border-red-600 border-2'
				}`}
				value={value}
			/>
			{error !== null && error.errorKey === inputName && (
				<p className='text-red-600 text-sm'>{error.errorDescription}</p>
			)}
		</>
	);
};

export { InputElement };
