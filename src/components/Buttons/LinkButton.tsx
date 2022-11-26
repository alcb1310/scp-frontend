const LinkButton = (props: {text:string, buttonColor: string, textColor: string, link: string}) => {
    const { text, textColor, buttonColor, link } = props

    const classToAdd = `inline-block ${buttonColor} ${textColor} px-8 py-2 mt-3 rounded-lg hover:bg-blue-300 hover:text-gray-700 shadow-lg hover:shadow-none uppercase tracking-wide font-bold`

    return <a className={classToAdd} href={link}>{text}</a>
}

export { LinkButton }