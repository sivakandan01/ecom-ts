import axios from "axios";

const base_url: string = "http://localhost:4000"

type LoginForm = { email: string; password: string };
type RegisterForm = {
    userName: string;
    email: string;
    password: string;
    role: string;
    companyName: string;
}

const Login = async (data: LoginForm) => await axios.post(`${base_url}/users/login`, data)

const Register = async (data: RegisterForm) => await axios.post(`${base_url}/users/register`, data)

export { Login, Register }