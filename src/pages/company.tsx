import { useEffect, useState } from "react";
import {
    FetchProducts,
    AddProduct,
    UpdateProduct,
    DeleteProduct,
} from "@/api/productApi";
import { TableData } from "@/components/DataTable";
import type { HeaderItem, SelectedProp } from "@/lib/utils";
import { ProductForm } from "@/components/form/productForm";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { DialogBox } from "@/components/ownComponent/DialogBox";
import { Dialog } from "@/components/ui/dialog";

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
            if (data.id !== "") {
                await UpdateProduct(data.id, data);
            } else {
                const { id, createdAt, updatedAt, ...rest } = data;
                await AddProduct(rest);
            }
            setOpenForm(false);
        } catch (err) {
            console.log(err);
        }
        FetchData();
    };

    const HandleCancel = () => {
        setOpenForm(false);
    };

    const HandleDelete = async () => {
        try {
            const response = await DeleteProduct(selectedRow.id);
            console.log("Deleted Successfully", response);
        } catch (err) {
            console.log("error deleting product", err);
        }
        setOpenDialog(false)
        FetchData()
    };

    const Actions = (row: SelectedProp) => {
        return (
            <div className="flex justify-evenly">
                <button onClick={() => HandleForm(row)}>✏️</button>
                <button onClick={() => HandledialogBox(row)}>🗑️</button>
            </div>
        );
    };

    const HandledialogBox = (row: SelectedProp) => {
        setSelectedRow(row);
        setOpenDialog(true);
    };

    const HandleDialogCancel = () => {
        setOpenDialog(false);
    };

    return (
        <div className="flex flex-col py-3 px-6 w-full">
            {!openForm && (
                <div>
                    <div className="flex justify-between">
                        <h3 className="font-medium">Product Detail:</h3>
                        <button
                            onClick={() =>
                                HandleForm({
                                    id: "",
                                    name: "",
                                    productType: "",
                                    price: 0,
                                    stock: 0,
                                    companyName: userData.companyName,
                                    createdAt: "",
                                    updatedAt: "",
                                })
                            }
                            className="px-2 py-1 bg-blue-500 text-white rounded-md"
                        >
                            Add Product
                        </button>
                    </div>
                    <div className="w-full border border-gray-300 mt-6 rounded-md">
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
