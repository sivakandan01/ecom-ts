import { base_url, type AddCartProp, type UpdateCartProp } from "@/lib/utils";
import axios from "axios";

const FetchCart = async () => await axios.get(`${base_url}/cart`)

const FetchCartById = async (id: string) => await axios.get(`${base_url}/cart/${id}`)

const FetchCartByUserId = async (id: string) => await axios.get(`${base_url}/cart/user/${id}`)

const AddToCart = async (data: AddCartProp) => await axios.post(`${base_url}/cart/add`, data)

const UpdateCart = async (id: string, data: UpdateCartProp) => await axios.put(`${base_url}/cart/update/${id}`, data)

const DeleteCart = async (id: string) => await axios.delete(`${base_url}/cart/delete/${id}`)

export {
    FetchCart,
    FetchCartById,
    FetchCartByUserId,
    AddToCart,
    UpdateCart,
    DeleteCart
}