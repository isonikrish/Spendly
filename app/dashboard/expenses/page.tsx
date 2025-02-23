"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import axios from "axios";
import { useEffect, useState } from "react";

interface Budget {
  name: string;
}

interface Expense {
  id: number;
  name: string;
  amount: number;
  Budgets?: Budget
}

export default function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]); // Typed state

  async function fetchExpenses() {
    try {
      const res = await axios.get("/api/expense");
      if (res.status === 200) {
        setExpenses(res.data);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setExpenses([]);
    }
  }

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="rounded-lg shadow-md px-10 py-5 w-full">
      <h2 className="text-xl font-semibold mb-4">My Expenses</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Budget Name</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((row) => (
            <TableRow key={row.id} className="hover:bg-accent transition">
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.Budgets?.name || "N/A"}</TableCell>
              <TableCell className="font-semibold">${row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
