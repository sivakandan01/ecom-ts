import { useEffect, useState } from "react";
import {
    FetchProducts,
    AddProduct,
    UpdateProduct,
    DeleteProduct,
} from "@/services/productApi";
import { TableData } from "@/components/DataTable";
import type { HeaderItem, SelectedProp } from "@/lib/utils";
import { ProductForm } from "@/components/form/productForm";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { DialogBox } from "@/components/customComponent/DialogBox";
import { Dialog } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Toast } from "@/hooks/custom-toast/toast";
import { Button } from "@/components/customComponent/Button";

const CompanyModule = () => {
    const { userData } = useSelector((state: RootState) => state.user);
    const [products, setProducts] = useState<SelectedProp[]>([]);
    const [openForm, setOpenForm] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [selectedRow, setSelectedRow] = useState<SelectedProp>({
        id: "",
        name: "",
        productType: "",
        price: 0,
        stock: 0,
        companyName: "",
        createdAt: "",
        updatedAt: "",
    });

    const Header: HeaderItem[] = [
        { key: "ProductName", value: "name" },
        { key: "Price", value: "price" },
        { key: "Stock", value: "stock" },
    ];

    const FetchData = async () => {
        try {
            const response = await FetchProducts();
            setProducts(response.data.data);
        } catch (err) {
            console.log("error fetching product", err);
        }
    };

    useEffect(() => {
        FetchData();
    }, []);

    const HandleForm = (row: SelectedProp) => {
        if (row.id !== "") {
            setSelectedRow(row);
        } else {
            setSelectedRow(row);
        }
        setOpenForm(true);
    };

    const HandleSubmit = async (data: SelectedProp) => {
        try {
            let text = "";
            if (data.id !== "") {
                await UpdateProduct(data.id, data);
                text = "Updated";
            } else {
                const {
                    id: _id,
                    createdAt: _createdAt,
                    updatedAt: _updatedAt,
                    ...rest
                } = data;
                await AddProduct(rest);
                text = "Added";
            }
            toast(
                <Toast
                    body={`Product ${text} successFully.`}
                    color="bg-green-200"
                />,
                {
                    unstyled: true,
                }
            );
            FetchData();
        } catch (err: unknown) {
            console.log(err);
        }
        setOpenForm(false);
    };

    const HandleCancel = () => {
        setOpenForm(false);
    };

    const HandleDelete = async () => {
        try {
            await DeleteProduct(selectedRow.id);
            toast(
                <Toast
                    body="Product Deleted SuccessFully"
                    color="bg-green-200"
                />,
                { unstyled: true }
            );
        } catch (err: unknown) {
            if (typeof err === "object") {
                toast(
                    <Toast
                        body={err.response?.data.message}
                        color="bg-red-200"
                    />,
                    { unstyled: true }
                );
            }
        }
        setOpenDialog(false);
        FetchData();
    };

    const Actions = (row: SelectedProp) => {
        return (
            <div className="flex justify-evenly">
                <button onClick={() => HandleForm(row)}>✏️</button>
                <button onClick={() => HandleDialogBox(row)}>🗑️</button>
            </div>
        );
    };

    const HandleDialogBox = (row: SelectedProp) => {
        setSelectedRow(row);
        setOpenDialog(true);
    };

    const HandleDialogCancel = () => {
        setOpenDialog(false);
    };

    const HandleEmptyForm = () => {
        HandleForm({
            id: "",
            name: "",
            productType: "",
            price: 0,
            stock: 0,
            companyName: userData.companyName,
            createdAt: "",
            updatedAt: "",
        });
    };

    return (
        <div className="flex flex-col py-3 px-6 w-full">
            {!openForm && (
                <div>
                    <div className="flex justify-between">
                        <h3 className="font-medium">Product Detail:</h3>
                        <Button
                            text="Add Product"
                            click={HandleEmptyForm}
                            classname="bg-blue-600 hover:bg-blue-400 text-white w-[130px]"
                            type="button"
                        />
                    </div>
                    <div className="w-full mt-6 rounded-md">
                        <TableData<SelectedProp>
                            header={Header}
                            data={products}
                            action={Actions}
                        />
                    </div>
                </div>
            )}
            {openForm && (
                <ProductForm
                    data={selectedRow}
                    save={HandleSubmit}
                    close={HandleCancel}
                />
            )}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogBox
                    title="Confirm Deletion"
                    body="Are you sure you want to delete?"
                    onCancel={HandleDialogCancel}
                    onSubmit={HandleDelete}
                />
            </Dialog>
        </div>
    );
};

export { CompanyModule };
