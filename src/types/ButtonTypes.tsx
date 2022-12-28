type buttonHTMLType = 'button' | 'reset' | 'submit' | undefined;
export type buttonProps = {
	buttonType: buttonHTMLType;
	text: string;
	onEvent: any;
};

export type modalButtonProps = {
	buttonType: buttonHTMLType;
	text: string;
	onEvent: any;
	modal: string;
};
