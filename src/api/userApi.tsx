import axios from "axios";
import { base_url } from "@/lib/utils"
import type { LoginForm, RegisterForm } from "@/lib/utils";

const FetchUsers = async () => await axios.get(`${base_url}/users/`)

const Login = async (data: LoginForm) => await axios.post(`${base_url}/users/login`, data)

const Register = async (data: RegisterForm) => await axios.post(`${base_url}/users/register`, data)

export { 
    Login, 
    Register,
    FetchUsers
}