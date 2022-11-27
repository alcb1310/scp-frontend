type buttonHTMLType = 'button' | 'reset' | 'submit' | undefined;
export type buttonProps = {
	buttonType: buttonHTMLType;
	text: string;
	onEvent: any;
};
