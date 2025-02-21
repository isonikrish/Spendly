"use client"
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useApp from "@/stores/useApp";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false)
  const { signup } = useApp();
  
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)
    await signup(formData);
    setIsLoading(false)

  }
  return (
    <div className="border px-6 py-6 rounded-lg shadow-sm w-[400px] text-center">
      <h1 className="text-xl font-semibold">Create Your Account</h1>
      <p className="text-sm text-gray-500 mb-5">Enter details to create your account</p>

      <form className="space-y-4 text-left" onSubmit={handleSignup}>
        <div className="space-y-2">
          <Label>Name</Label>
          <Input placeholder="Enter your name" onChange={(e) => setFormData({ ...formData, name: e.target.value ?? "" })} value={formData.name} />
        </div>

        <div className="space-y-2">
          <Label>Email</Label>
          <Input placeholder="Enter your email" onChange={(e) => setFormData({ ...formData, email: e.target.value ?? "" })} value={formData.email} />
        </div>

        <div className="space-y-2">
          <Label>Password</Label>
          <Input type="password" placeholder="Enter your password" onChange={(e) => setFormData({ ...formData, password: e.target.value ?? "" })} value={formData.password} />
        </div>

        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? "loading...." : "Signup"}
        </Button>      </form>
      <p className="text-sm my-2">Already have an account? <Link href={'/login'} className="text-blue-400 underline cursor-pointer">Login</Link></p>
    </div>
  );
}

export default Signup;