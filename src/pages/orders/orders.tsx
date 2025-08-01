/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { SearchBar } from "@/components/customComponent/searchBar"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { FetchOrderByUserId } from "@/services/orderApi"
import type { HeaderItem, UpdateOrderProp } from "@/lib/utils"
import { SelectDropDown } from "@/components/customComponent/SelectDropDown"
import { TableData } from "@/components/DataTable"

const Orders = () => {
    const [searchValue, setSearchValue] = useState("")
    const [OrderData, setOrderData] = useState<UpdateOrderProp[]>([])
    const [productOptions, setProductOptions] = useState([])
    const [selectProduct, setSelectedProduct] = useState("")

    const { userData } = useSelector((state: RootState) => state.user)

    const Headers: HeaderItem[] = [
        { key: "Product Name", value: "productName" },
        { key: "User Name", value: "userName" },
        { key: "Quantity", value: "quantity" },
        { key: "Price", value: "cost" }
    ]

    const FetchUserOrder = async () => {
        try{
            const response = await FetchOrderByUserId({id: userData.id, product: selectProduct, search: searchValue})
            if(response.data.success){
                setOrderData(response.data.data)
            } else {
                setOrderData([])
            }
        }catch (err){
            console.log(err)
        }
    }

    const FetchOptions = async () => {
        try{
            const response = await FetchOrderByUserId({id: userData.id, product: "", search: ""})
            const ProductOptions = response?.data?.data.map((data: UpdateOrderProp) => {
                return({
                    key: data.productName,
                    value: data.productId
                })
            })
            setProductOptions(ProductOptions)
        }catch (err){
            console.log(err)
        }
    }

    useEffect(() => {
        FetchUserOrder()
    },[userData, searchValue, selectProduct])

    useEffect(() => {
        FetchOptions()
    },[])
    
    return(
        <div className="p-3 space-y-3">
            <div>
                <p className="font-medium">Orders</p>
            </div>
            <div className="flex justify-between">
                <div>
                    <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} /> 
                </div>
                <div>
                    <SelectDropDown values={selectProduct} setValues={setSelectedProduct} options={productOptions} placeHolder="Select the Product"/>
                </div>
            </div>
            <div>
                <TableData<UpdateOrderProp> header={Headers} data={OrderData} />
            </div>
        </div>
    )
}

export { Orders }