import axios from "axios"

const ErrorResponse = (error: unknown): string => {
    if(axios.isAxiosError(error)){
        return error.response?.data.message || "Error Occurred"
    }
    return "Error Occurred"
}   

export { ErrorResponse }