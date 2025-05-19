import { base_url, type AddOrderProp, type UpdateOrderProp } from "@/lib/utils";
import axios from "axios";

const FetchOrders = async () => await axios.get(`${base_url}/order/`)

const CreateOrder = async (data: AddOrderProp) => await axios.post(`${base_url}/order/add`,data)

const UpdateOrder = async (data: UpdateOrderProp) => await axios.put(`${base_url}/order/update/${data.id}`, data)

export {
    FetchOrders,
    CreateOrder,
    UpdateOrder
}