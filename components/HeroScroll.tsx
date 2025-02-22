"use client";
import React from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";
import heroImg from "@/public/dashboard.png";
import Image from "next/image";

export default function HeroScroll() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <span className="text-2xl md:text-4xl font-semibold text-black dark:text-white">
              Manage your Money with AI-Driven Personal
            </span>
            <br />
            <span className="text-5xl md:text-9xl md:text-[8rem] font-bold mt-1 leading-none bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Finance Advisor
            </span>
          </>
        }
      >
        <Image
          src={heroImg}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
