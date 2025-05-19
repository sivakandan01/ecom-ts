import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useEffect, useState } from "react";
import type { ChartDataprop, ChartProp } from "@/lib/utils";

const BarChartLayout = ({ data, head }: ChartProp) => {
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
                    <BarChart data={chartData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export { BarChartLayout };
