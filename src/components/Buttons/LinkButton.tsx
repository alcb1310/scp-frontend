const LinkButton = (props: {text:string, buttonColor: string, textColor: string, link: string}) => {
    const { text, textColor, buttonColor, link } = props


    return <a className="btn-primary" href={link}>{text}</a>
}

export { LinkButton }