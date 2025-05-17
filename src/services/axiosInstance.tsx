import axios from "axios"
import { base_url } from "@/lib/utils"
import { ErrorResponse } from "@/lib/helpers/error"

type MethodType = "get" | "post" | "put" | "delete"

type AxiosProp = {
    method: MethodType,
    url: string,
    data?: any
}

const AxiosResponse = async ({method, url, data}: AxiosProp) => {
    try{
        const response = await (axios as any)[method](`${base_url}/${url}`, data)
        return response
    } catch (err){
        return ErrorResponse(err)
    }
}

export { AxiosResponse }