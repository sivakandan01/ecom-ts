import axios from "axios";
import { base_url } from "@/lib/utils";
import type { AddData, SelectedProp } from "@/lib/utils";

const FetchProducts = async (data: { type: string; company: string , search: string }) =>
  await axios.get(
    `${base_url}/products?company=${data.company}&type=${data.type}&search=${data.search}`
  );

const FetchById = async (id: string) =>
  await axios.get(`${base_url}/products/${id}`);

const FetchByName = async (name: string) =>
  await axios.get(`${base_url}/products/${name}`);

const AddProduct = async (data: AddData) =>
  await axios.post(`${base_url}/products/add`, data);

const UpdateProduct = async (id: string, updatedData: SelectedProp) =>
  await axios.put(`${base_url}/products/update/${id}`, updatedData);

const DeleteProduct = async (id: string) =>
  await axios.delete(`${base_url}/products/delete/${id}`);

export {
  FetchProducts,
  FetchById,
  FetchByName,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
};
