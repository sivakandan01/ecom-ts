import type { SelectedProp } from "@/lib/utils";
import { useState } from "react";
import { TextInput, NumberInput } from "../customComponent/InputTags";
import { Button } from "../customComponent/Button";

type formProp = {
    data: SelectedProp;
    save: (data: SelectedProp) => void;
    close: () => void;
};

const ProductForm = ({ data, save, close }: formProp) => {
    const [formData, setFormData] = useState<SelectedProp>(data);

    const text = formData.id ? "Update Product" : "Create Product"

    const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "price" || name === "stock" ? Number(value) : value,
        }));
    };

    const HandleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        save(formData);
    };

    return (
        <div className="w-[320px]">
            <form onSubmit={HandleSubmit} className="space-y-4">
                <h2 className="font-bold flex justify-center">Product Form</h2>
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
                    <Button
                        text="Cancel"
                        type="button"
                        click={close}
                        classname="border border-gray-400 hover:bg-gray-100 w-[100px]"
                    />
                    <Button
                        type="submit"
                        classname="text-white bg-blue-700 hover:bg-blue-500 w-[130px]"
                        text={text}
                    />
                </div>
            </form>
        </div>
    );
};

export { ProductForm };
