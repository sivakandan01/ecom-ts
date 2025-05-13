import { Card, CardFooter, CardContent } from "@/components/ui/card";
import { FetchProducts } from "@/api/productApi";
import { AddToCart } from "@/api/cartApi";
import { useEffect, useState } from "react";
import type { AddCartProp, SelectedProp } from "@/lib/utils";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

const Main = () => {
    const [products, setProducts] = useState<SelectedProp[]>([]);
    const [quantity, setQuantity] = useState<number>(0);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const { userData } = useSelector((state: RootState) => state.user)

    const FetchData = async () => {
        try {
            const response = await FetchProducts();
            setProducts(response.data.data);
        } catch (err) {
            console.log("error fetching products", err);
        }
    };

    const AddCart = async (row: SelectedProp) => {
        try {
            const data: AddCartProp = {
                productId: row.id,
                productName: row.name,
                userId: userData.id,
                price: row.price * quantity,
                quantity: quantity
            }
            const response = await AddToCart(data);
            console.log(response);
        } catch (err) {
            console.log("Error adding to Cart", err);
        }
    };

    const AddMinus = (type: string) => {
        if (type === "add" && quantity < 9) {
            setQuantity((prev) => prev + 1);
        } else if (type === "minus" && quantity > 0) {
            setQuantity((prev) => prev - 1);
        }
    };

    useEffect(() => {
        FetchData();
    }, []);

    const filteredProduct = products.filter((prod) =>
        prod.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="px-6 py-4 overflow-auto">
            <div className="flex justify-center mb-5">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-[40%] border border-gray-300 h-10 rounded-md px-4"
                    placeholder="Search Here ..."
                />
            </div>
            <div className="grid grid-cols-4 gap-4">
                {filteredProduct.map((product) => (
                    <Card className="w-full" key={product.id}>
                        <CardContent>
                            <div>
                                <img
                                    src="/src/assets/shdcn.jpg"
                                    className="w-full"
                                />
                                <div className="flex justify-between mt-2">
                                    <p>{product.name}</p>
                                    <p>₹{product.price}</p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className="flex justify-between w-full">
                                <button
                                    className="py-1 px-2 bg-gray-400 hover:bg-gray-200 rounded-md"
                                    onClick={() => AddMinus("minus")}
                                >
                                    -
                                </button>
                                <button
                                    className="py-1 px-2 bg-blue-400 hover:bg-green-400 text-white rounded-md"
                                    onClick={() => AddCart(product)}
                                >
                                    Add To Cart
                                </button>
                                <button
                                    className="py-1 px-2 bg-gray-400 hover:bg-gray-200 rounded-md"
                                    onClick={() => AddMinus("add")}
                                >
                                    +
                                </button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Main;
