import type { Dispatch, SetStateAction } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import type { HeaderItem } from "@/lib/utils"

type SelectDropDownProp = {
    placeHolder: string,
    options: HeaderItem[],
    values: string,
    setValues: Dispatch<SetStateAction<string>>
}

const SelectDropDown = ({ placeHolder, options, values, setValues}: SelectDropDownProp) => {
    return(
        <div>
            <Select value={values} onValueChange={setValues}>
                <SelectTrigger>
                    <SelectValue placeholder={placeHolder}></SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="All">{placeHolder}</SelectItem>
                    {options.map((option) => 
                        <SelectItem value={option.value} key={option.value}>{option.key}</SelectItem>
                    )}
                </SelectContent>
            </Select>
        </div>
    )
}

export { SelectDropDown }