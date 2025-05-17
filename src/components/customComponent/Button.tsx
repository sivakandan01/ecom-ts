type ButtonProp = {
    text: string,
    click?: () => void,
    classname?: string,
    type: "submit" | "reset" | "button" | undefined
}

const Button = ({text, click, classname, type}: ButtonProp) => {
    return(
        <button
            onClick={click}
            className={`h-[36px] flex justify-center items-center rounded-md ${classname}`}
            type={type}
        >
            {text}
        </button>
    )
}

export { Button }