import type { SelectedProp } from "@/lib/utils";
import { useState } from "react";
import { TextInput, NumberInput } from "../customComponent/InputTags";

type formProp = {
  data: SelectedProp;
  save: (data: SelectedProp) => void;
  close: () => void;
};

const ProductForm = ({ data, save, close }: formProp) => {
  const [formData, setFormData] = useState<SelectedProp>(data);

  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const HandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    save(formData);
  };

  return (
    <div className="w-[320px]">
      <form onSubmit={HandleSubmit} className="space-y-4">
        <h3 className="font-semibold text-[20px]">Product Form</h3>
        <TextInput 
            label="Product Name"
            name="name" 
            value={formData.name} 
            onchange={HandleChange} 
        />
        <TextInput
          label="Product Type"
          name="productType"
          value={formData.productType}
          onchange={HandleChange}
        />
        <NumberInput
          label="Price"
          name="price"
          value={formData.price}
          onchange={HandleChange}
        />
        <NumberInput
          label="Stock"
          name="stock"
          value={formData.stock}
          onchange={HandleChange}
        />
        <div className="flex justify-between">
          <button type="button" onClick={close} className="border py-1 px-2 border-gray-400 rounded-md">
            Cancel
          </button>
          <button type="submit"  className="text-white py-1 px-2 bg-blue-600 rounded-md">
            {formData.id ? "Update Product" : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export { ProductForm };
