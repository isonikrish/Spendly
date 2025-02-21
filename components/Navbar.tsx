"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import useApp from "@/stores/useApp";
import { useEffect } from "react";
import {LayoutDashboard} from 'lucide-react'
function Navbar() {
    const router = useRouter();
    const { user,fetchUser, logout } = useApp();

    useEffect(() => {
        fetchUser();
    }, [])
    return (
        <div className="px-10 py-3 border-b flex justify-between">
            <Link className="text-xl font-semibold cursor-pointer" href="/">Spendly</Link>
            {user? <div className="flex gap-2">
                <Button variant={"outline"}><LayoutDashboard /> Dashboard</Button>
                <Button onClick={logout}>Logout</Button>
            </div> :  <div className="flex gap-2">
                <Button variant="outline" onClick={() => router.push("/login")}>
                    Login
                </Button>
                <Button onClick={() => router.push("/signup")}>
                    Create Account
                </Button>
            </div>}
           
        </div>
    );
}

export default Navbar;
