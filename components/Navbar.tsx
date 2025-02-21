"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import useApp from "@/stores/useApp";
import { useEffect } from "react";
import { LayoutDashboard } from "lucide-react";
import logo from "../public/logo.png";

function Navbar() {
  const router = useRouter();
  const { user, fetchUser, logout } = useApp();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  return (
    <div className="px-10 py-3 border-b flex justify-between">
      <Link
        className="text-xl text-center flex justify-center items-center font-semibold cursor-pointer"
        href="/"
      >
        <Image src={logo} height={50} width={50} alt="logo"></Image>
        Spendly
      </Link>
      {user ? (
        <div className="flex gap-5 justify-center items-center">
          <Button variant={"outline"}>
            <LayoutDashboard /> Dashboard
          </Button>

          <button
            onClick={logout}
            className="group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
          >
            <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
              <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
              </svg>
            </div>
            <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              Logout
            </div>
          </button>
        </div>
      ) : (
        <div className="flex gap-4 justify-center items-center">
          <Button
            className="border border-white font-semibold rounded-3xl px-6 py-4"
            variant="outline"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
          <div
            onClick={() => router.push("/signup")}
            className="relative inline-flex items-center justify-center gap-4 group"
          >
            <div className="absolute inset-0 duration-1000 opacity-60 transitiona-all bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"></div>
            <a
              role="button"
              className="group relative inline-flex items-center justify-center text-base rounded-xl bg-[#0A0A0A] px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30"
              title="payment"
            >
              Get Started For Free
              <svg
                aria-hidden="true"
                viewBox="0 0 10 10"
                height="10"
                width="10"
                fill="none"
                className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
              >
                <path
                  d="M0 5h7"
                  className="transition opacity-0 group-hover:opacity-100"
                ></path>
                <path
                  d="M1 1l4 4-4 4"
                  className="transition group-hover:translate-x-[3px]"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
