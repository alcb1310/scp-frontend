import { buttonProps } from '../../types/ButtonTypes';

const AddButton = (props: buttonProps) => {
	const { buttonType, text, onEvent } = props;

	return (
		<button
			className='px-8 py-2 mr-2 rounded-lg bg-indigo-700 text-gray-200 hover:bg-gray-200 hover:text-indigo-700 shadow-lg'
			type={buttonType}
			onClick={onEvent}
		>
			{text}
		</button>
	);
};
export { AddButton };
