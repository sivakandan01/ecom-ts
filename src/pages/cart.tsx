import { DeleteCart, FetchCartByUserId } from "@/api/cartApi";
import { TableData } from "@/components/DataTable";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import type { HeaderItem, UpdateCartProp } from "@/lib/utils";
import type { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Cart = () => {
    const [cartData, setCartData] = useState<UpdateCartProp[]>([]);
    const { userData } = useSelector((state: RootState) => state.user);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [selectedRow, setSelectedRow] = useState<UpdateCartProp | null>(null);
    const [total, setTotal] = useState<number>(0)

    const userId = userData.id || null;

    const FetchData = async () => {
        try {
            const response = await FetchCartByUserId(userId);

            if (response.data.success) {
                setCartData(response.data.data);
            }
        } catch (err) {
            console.log("unable to fetch cart", err);
        }
    };

    const CartHeader: HeaderItem[] = [
        { key: "Product Name", value: "productName" },
        { key: "Quantity", value: "quantity" },
        { key: "Price", value: "price" },
    ];

    useEffect(() => {
        FetchData();
    }, []);

    useEffect(()=> {
        setTotal(0)
        cartData.forEach((cart) => setTotal((tot) => tot + cart.price))
    },[cartData])

    const DeleteProductInCart = async () => {
        try {
            if (selectedRow) {
                const response = await DeleteCart(selectedRow.id);
                if (response) {
                    console.log(response);
                }
            }
            FetchData()
        } catch (err) {
            console.log("unable to delete cart", err);
        }
        setOpenDialog(false);
    };

    const Actions = (row: UpdateCartProp) => {
        return (
            <button
                className=""
                onClick={() => {
                    setSelectedRow(row);
                    setOpenDialog(true);
                }}
            >
                🗑️
            </button>
        );
    };

    return (
        <div className="p-6 flex flex-row">
            <div className="w-[70%] rounded-md">
                <TableData<UpdateCartProp>
                    header={CartHeader}
                    data={cartData}
                    action={Actions}
                />
            </div>
            <div className="w-[30%]">
                <Card className="mx-8 space-y-4">
                    <CardHeader className="flex justify-center">
                        Payout
                    </CardHeader>
                    <hr />
                    <CardContent className="px-4">
                        {cartData.map((ct) => (
                            <div className="flex justify-between" key={ct.id}>
                                <p>{ct.productName}</p>
                                <p>₹{ct.price}</p>
                            </div>
                        ))}
                    </CardContent>
                    <CardFooter>
                        <div className="w-full mb-3 px-4 space-y-2">
                            <div className="flex justify-between">
                                <p className="font-medium text-sm">Total:</p>
                                <p>{total}</p>
                            </div>
                            <button className="bg-green-500 hover:bg-blue-500 w-full rounded-md text-white py-1 items-center">
                                PayNow
                            </button>
                        </div>
                    </CardFooter>
                </Card>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="w-[350px]">
                    <DialogHeader className="space-y-2">
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="w-full flex justify-between gap-x-4">
                        <button
                            className="border border-gray-400 py-1 px-2 rounded-md hover:bg-gray-200"
                            onClick={() => setOpenDialog(false)}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={DeleteProductInCart}
                            className="bg-red-500 text-white py-1 px-2 rounded-md"
                        >
                            Delete
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export { Cart };
