import { base_url, type AddOrderProp, type UpdateOrderProp } from "@/lib/utils";
import axios from "axios";

const FetchOrders = async (data: {id: string, product: string, search: string}) => 
    await axios.get(`${base_url}/order?product=${data.product}&search=${data.search}&id=${data.id}`)

const FetchOrderByUserId = async(data: {id: string, product: string, search: string}) => 
    await axios.get(`${base_url}/order/user/${data.id}?product=${data.product}&search=${data.search}`)

const CreateOrder = async (data: AddOrderProp) => await axios.post(`${base_url}/order/add`,data)

const UpdateOrder = async (data: UpdateOrderProp) => await axios.put(`${base_url}/order/update/${data.id}`, data)



export {
    FetchOrders,
    FetchOrderByUserId,
    CreateOrder,
    UpdateOrder
}