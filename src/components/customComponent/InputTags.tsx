import type React from "react"

const TextInput = (
    { onchange, name, value, label } : 
    {
        onchange: (e: React.ChangeEvent<HTMLInputElement>) => void, 
        name: string, 
        value: string | undefined,
        label: string
    }
) => {
    return(
        <div>
            <label className="text-[16px] font-medium">{label}</label><br />
            <input
                type="text"
                onChange={onchange}
                name={name} 
                value={value}
                className="w-[320px] border border-gray-400 h-[36px] px-2 rounded-md mt-1"
            />
        </div>
    )
}

const NumberInput = (
    { onchange, name, value, label } : 
    {
        onchange: (e: React.ChangeEvent<HTMLInputElement>) => void, 
        name: string, 
        value: number,
        label: string
    }
) => {
    return(
        <div>
            <label className="text-[16px] font-medium">{label}</label><br />
            <input
                type="number"
                onChange={onchange}
                name={name}
                value={value}
                className="w-[320px] border border-gray-400 h-[36px] px-2 rounded-md mt-1"
            />
        </div>
    )
}

export {
    TextInput,
    NumberInput
}