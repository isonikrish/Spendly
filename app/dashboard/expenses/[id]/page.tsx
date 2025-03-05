"use client";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import BudgetCard from "@/components/BudgetCard";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Budget {
  id: number;
  icon: string;
  name: string;
  amount: number;
  spent: number;
}

function Expense() {
  const { id } = useParams();
  const [budget, setBudget] = useState<Budget | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
  });

  // Wrap fetchBudget in useCallback to prevent redefinition on every render
  const fetchBudget = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    try {
      const res = await axios.get(`/api/budget?id=${id}`);
      if (res.data) {
        setBudget(res.data);
      }
    } catch {
      setBudget(null);
    } finally {
      setLoading(false);
    }
  }, [id]); // Dependency on id to refetch if id changes

  useEffect(() => {
    fetchBudget();
  }, [fetchBudget]); // Dependency on fetchBudget to avoid unnecessary rerenders

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    if (!formData.name || !formData.amount) {
      setError("All fields are required.");
      setSubmitting(false);
      return;
    }

    try {
      const res = await axios.post("/api/expense", {
        name: formData.name,
        amount: formData.amount,
        budgetId: id,
      });

      if (res.status === 200) {
        fetchBudget();
        setFormData({ name: "", amount: "" });
      } else {
        setError("Failed to add expense.");
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="px-10 py-5">
      <Link
        className="flex text-xl font-semibold gap-2 items-center cursor-pointer mb-10"
        href={"/dashboard"}
      >
        <ArrowLeft /> My Expenses
      </Link>
      <div className="flex justify-between w-full">
        <div className="mt-5">
          {loading ? (
            <p className="text-gray-500">Loading budget...</p>
          ) : budget ? (
            <BudgetCard budget={budget} />
          ) : (
            <p className="text-gray-500">No budget found.</p>
          )}
        </div>
        <div className="border px-5 py-3 w-[400px]">
          <h1 className="text-lg font-semibold">Add Expense</h1>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-2 mt-2">
              <Label>Expense Name</Label>
              <Input
                name="name"
                placeholder="eg. Bedroom door"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Expense Amount</Label>
              <Input
                name="amount"
                placeholder="eg. 1000"
                value={formData.amount}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" className="my-2 w-full" disabled={submitting}>
              {submitting ? "Adding..." : "Add New Expense"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Expense;
