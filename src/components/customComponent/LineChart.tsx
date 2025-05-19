import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader } from "../ui/card";
import type { ChartProp, ChartDataprop } from "@/lib/utils";
import { useEffect, useState } from "react";

const LineChartLayout = ({ head, data }: ChartProp) => {
    const [chartData, setChartData] = useState<ChartDataprop[]>();

    useEffect(() => {
        setChartData(data);
    }, [data]);

    return (
        <Card className="h-64">
            <CardHeader className="flex justify-center font-medium">
                {head}
            </CardHeader>
            <CardContent className="h-full pr-2">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#8884d8"
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export { LineChartLayout };
