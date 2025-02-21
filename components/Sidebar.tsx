"use client"
import { LayoutGrid, PiggyBank, ReceiptText, CircleDollarSign } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Sidebar() {
    const path = usePathname();
    
    const menuList = [
        {
            id: 1,
            name: "Dashboard",
            icon: LayoutGrid,
            path: "/dashboard",
        },
        {
            id: 2,
            name: "Incomes",
            icon: CircleDollarSign,
            path: "/dashboard/incomes",
        },
        {
            id: 3,
            name: "Budgets",
            icon: PiggyBank,
            path: "/dashboard/budgets",
        },
        {
            id: 4,
            name: "Expenses",
            icon: ReceiptText,
            path: "/dashboard/expenses",
        },
    ]

    return (
        <div className="border-r min-h-screen w-64">
            <ul>

                {menuList?.map((item) => {
                    return (
                        <Link key={item.id} className={`flex items-center gap-3 px-4 py-6 text-lg cursor-pointer border-b hover:bg-secondary ${path===item.path ? "bg-secondary": ""}`} href={item.path} >
                            {React.createElement(item.icon, { size: 18 })}
                            <span>{item.name}</span>
                        </Link>

                    )
                })}

            </ul>
        </div>
    );
}

export default Sidebar;
