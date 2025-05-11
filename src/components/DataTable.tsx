import {
    Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import type { HeaderItem, TotalTableProp } from "@/lib/utils"

const TableData = <T,>({header, data, action} : TotalTableProp<T> ) => {
    return(
        <Table>
            <TableHeader className="bg-gray-100">
                <TableRow>
                    {header.map((head: HeaderItem) =>
                        <TableHead key={head.key}>{head.key}</TableHead>
                    )}
                    {action && <TableHead></TableHead>}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((dt, index: number) =>
                    <TableRow key={index} className="hover:bg-blue-100"> 
                        {header.map((head: HeaderItem, index: number) => 
                            <TableCell key={index}>{(dt as any)[head.value]}</TableCell>
                        )}
                        {action && <TableCell>{action(dt)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export { TableData }