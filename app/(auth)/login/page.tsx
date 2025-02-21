"use client"
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useApp from "@/stores/useApp";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false)
    const { login } = useApp();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)
        await login(formData);
        setIsLoading(false)

    }
    return (
        <div className="border px-6 py-6 rounded-lg shadow-sm w-[400px] text-center">
            <h1 className="text-xl font-semibold">Welcome Back</h1>
            <p className="text-sm text-gray-500 mb-5">Enter details to login to your account</p>

            <form className="space-y-4 text-left" onSubmit={handleLogin}>
                <div className="space-y-2">
                    <Label>Email</Label>
                    <Input placeholder="Enter your email" onChange={(e) => setFormData({ ...formData, email: e.target.value ?? "" })} value={formData.email} />
                </div>

                <div className="space-y-2">
                    <Label>Password</Label>
                    <Input type="password" placeholder="Enter your password" onChange={(e) => setFormData({ ...formData, password: e.target.value ?? "" })} value={formData.password} />
                </div>

                <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? "loading...." : "Login"}
                </Button>      </form>
            <p className="text-sm my-2">Don't have an account? <Link href={'/signup'} className="text-blue-400 underline cursor-pointer">Signup</Link></p>
        </div>
    );
}

export default Login;