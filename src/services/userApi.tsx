import axios from "axios";
import { base_url } from "@/lib/utils";
import type { LoginForm, RegisterForm, UserItem } from "@/lib/utils";

const FetchUsers = async (data: {
  role: string;
  company: string;
  search: string;
}) =>
  await axios.get(
    `${base_url}/users?role=${data.role}&company=${data.company}&search=${data.search}`
  );

const FetchById = async (id: string) =>
  await axios.get(`${base_url}/users/${id}`);

const Login = async (data: LoginForm) =>
  await axios.post(`${base_url}/users/login`, data);

const Register = async (data: RegisterForm) =>
  await axios.post(`${base_url}/users/register`, data);

const UpdateUser = async (id: string, data: UserItem) =>
  await axios.put(`${base_url}/users/update/${id}`, data);

export { Login, FetchById, Register, FetchUsers, UpdateUser };
