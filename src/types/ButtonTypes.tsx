type ButtonHTMLType = "button" | "reset" | "submit" | undefined;
export type ButtonProps = {
  buttonType: ButtonHTMLType;
  text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEvent: any;
};
