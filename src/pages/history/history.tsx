import { BarChartLayout } from "@/components/customComponent/BarChart";
import { Button } from "@/components/customComponent/Button";
import { LineChartLayout } from "@/components/customComponent/LineChart";
import type { UpdateOrderProp } from "@/lib/utils";
import { FetchOrders } from "@/services/orderApi";
import { useEffect, useState } from "react";

const History = () => {
    const [type, setType] = useState<string>("bar");
    const [orderData,setOrderData] = useState<UpdateOrderProp[]>([])

    const data = [
        { name: "phone", value: 3000 },
        { name: "laptop", value: 1500 },
        { name: "pc", value: 2000 },
        { name: "watch", value: 1000 },
    ];

    const FetchData = async () => {
        try{
            const response = await FetchOrders()
            if(response.data.success){
                setOrderData(response.data.data)
            }
        } catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        FetchData()
    },[])

    console.log(orderData)

    return (
        <div>
            <div className="flex flex-row justify-between py-6 px-1">
                <p className="font-medium text-2xl">Sales</p>
                <div className="flex flex-row space-x-4">
                    <Button
                        text="Bar"
                        click={() => setType("bar")}
                        type="button"
                        classname={`w-[80px] ${
                            type === "bar" ? "bg-gray-400" : "bg-gray-100"
                        }`}
                    />
                    <Button
                        text="line"
                        click={() => setType("line")}
                        type="button"
                        classname={`w-[80px] ${
                            type === "line" ? "bg-gray-400" : "bg-gray-100"
                        }`}
                    />
                </div>
            </div>
            {type === "bar" && (
                <div className="grid grid-cols-2 gap-6">
                    <BarChartLayout data={data} head="Bar Chart" />
                    <BarChartLayout data={data} head="Bar Chart" />
                    <BarChartLayout data={data} head="Bar Chart" />
                    <BarChartLayout data={data} head="Bar Chart" />
                </div>
            )}
            {type === "line" && (
                <div className="grid grid-cols-2 gap-6">
                    <LineChartLayout data={data} head="Line Chart" />
                    <LineChartLayout data={data} head="Line Chart" />
                    <LineChartLayout data={data} head="Line Chart" />
                    <LineChartLayout data={data} head="Line Chart" />
                </div>
            )}
        </div>
    );
};

export { History };
