import { DeleteCart, FetchCartByUserId } from "@/api/cartApi"
import { TableData } from "@/components/DataTable"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import type { HeaderItem, UpdateCartProp } from "@/lib/utils"
import type { RootState } from "@/store/store"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const Cart = () => {
    const [cartData, setCartData] = useState<UpdateCartProp[]>([])
    const { userData } = useSelector((state: RootState) => state.user)
    const [openDialog, setOpenDialog] = useState<boolean>(false)

    const userId = userData.id || null

    const FetchData = async () => {
        try{
            const response = await FetchCartByUserId(userId)

            if(response.data.success){
                setCartData(response.data.data)
            }
        } catch(err){
            console.log("unable to fetch cart", err)
        }
    }

    const CartHeader: HeaderItem[] = [
        {key: "Product Name", value: "productName"},
        {key: "Quantity", value: "quantity"},
        {key: "Price", value: "price"},
    ]

    useEffect(() => {
        FetchData()
    }, [])

    const DeletePopOver = () => {
        return(
            <Dialog>
                <DialogHeader>

                </DialogHeader>
                <DialogContent>

                </DialogContent>
                <DialogFooter>

                </DialogFooter>
            </Dialog>
        )
    }

    const DeleteProductInCart = async (row: UpdateCartProp) => {
        try{
            const response = await DeleteCart(row.id)
            if(response){
                console.log(response)
            }
        } catch (err){
            console.log("unable to delete cart", err)
        }
    }

    return(
        <div className="p-6 flex flex-row">
            <div className="w-[70%]">
                <TableData<UpdateCartProp>
                    header={CartHeader}
                    data={cartData}
                />
            </div>
            <div className="w-[30%]">
                <Card>
                    <CardHeader className="flex justify-center">
                        Payout
                    </CardHeader>
                    <CardContent>
                        {cartData.map((ct) =>
                            <div className="flex justify-between">
                                <p>{ct.productName}</p>
                                <p>{ct.price}</p>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter>
                        <div className="px-6 w-full">
                            <button 
                                className="bg-blue-600 text-white py-2 items-center"
                            >
                                PayNow
                            </button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export { Cart }