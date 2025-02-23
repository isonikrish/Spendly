import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { getExpenses } from "@/app/api/dashboard/route";

async function ExpenseListTable() {
  const result = await getExpenses();
  const expenses = Array.isArray(result) ? result : [];
  return (
    <div className="border rounded-2xl p-8 h-auto w-full shadow-lg shadow-gray-800 mt-5">
      <h2 className="font-bold text-3xl my-2">Latest Expenses</h2>
      <Table>
        <TableCaption>A list of your latest Expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] font-bold">Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell className="font-medium">{expense.name}</TableCell>
              <TableCell>{expense.amount}</TableCell>
              <TableCell>{expense.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ExpenseListTable;
