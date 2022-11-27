import { buttonProps } from '../../types/ButtonTypes';

const SecondaryButton = (props: buttonProps) => {
	const { buttonType, text, onEvent } = props;

	return (
		<button
			className='px-8 py-2 mt-3 mr-2 rounded-lg text-blue-800 bg-gray-200 hover:text-gray-200 hover:bg-blue-800 shadow-lg'
			type={buttonType}
			onClick={onEvent}
		>
			{text}
		</button>
	);
};

export { SecondaryButton };
