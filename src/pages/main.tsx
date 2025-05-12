import { Card, CardFooter, CardContent } from "@/components/ui/card";
import {
    AddProduct,
    FetchProducts
} from "@/api/productApi"
import { useEffect, useState } from "react";
import type { SelectedProp } from "@/lib/utils";

const Main = () => {
    const [products, setProducts] = useState<SelectedProp[]>([])
    const [quantity, setQuantity] = useState<number>(0)

    const FetchData = async () => {
        try{
            const response = await FetchProducts()
            setProducts(response.data.data)
        } catch(err){
            console.log("error fetching products", err)
        }
    }

    const AddToCart = async (row: SelectedProp) => {
        try{
            const response = await AddProduct(row)
            console.log(response)
        } catch(err){
            console.log('Error adding to Cart', err)
        }
    }

    const AddMinus = (type: string) => {
        if(type === "add" && quantity < 9){
            setQuantity((prev) => prev + 1)
        } else if (type === "minus" && quantity > 0) {
            setQuantity((prev) => prev - 1)
        }
    }

    useEffect(() => {
        FetchData()
    }, [])

    return (
        <div className="px-6 py-4 overflow-auto">
            <div className="grid grid-cols-3 gap-4">
                {products.map((product) => 
                    <Card className="w-full" key={product.id}>
                    <CardContent>
                        <div>
                            <img src="/src/assets/shdcn.jpg" className="w-full" />
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
                                onClick={() => AddToCart(product)}
                            >
                                Add To Cart {quantity > 0 ? `(${quantity})` : ""}
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
                )}
            </div>
        </div>
    );
};

export default Main;
