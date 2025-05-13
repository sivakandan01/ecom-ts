import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const base_url: string = "http://localhost:4000"

type LoginForm = { email: string; password: string };

type RegisterForm = {
    userName: string;
    email: string;
    password: string;
    role: string;
    companyName: string;
}

type AddData = {
    name: string,
    productType: string,
    price: number,
    stock: number,
    companyName?: string
}

type SelectedProp = {
    id: string,
    name: string,
    productType: string,
    price: number,
    stock: number,
    companyName?: string,
    createdAt: string,
    updatedAt: string
}

type HeaderItem = {
  key: string;
  value: string;
}

type UserItem = {
  id: string,
  userName: string,
  password: string,
  role: string,
  companyName?: string,
  createdAt: string,
  updatedAt: string
}

type TotalTableProp<T> = {
    header: HeaderItem[], 
    data: T[],
    action?: (row: SelectedProp) => React.ReactNode;
}

type AddCartProp = {
    productId: string,
    productName: string,
    userId: string,
    price: number,
    quantity: number
}

type UpdateCartProp = {
    id: string,
    productId: string,
    productName: string,
    userId: string,
    price: number,
    quantity : number,
    createdAt: string,
    updatedAt: string
}

export { base_url }

export type { 
  LoginForm, 
  RegisterForm, 
  AddData, 
  HeaderItem,
  SelectedProp,
  TotalTableProp,
  UserItem,
  AddCartProp,
  UpdateCartProp
}
