"use client";
import { ReactNode } from "react";

export default function InteractiveCard({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className="w-[50%] transition-shadow duration-300 ease-in-out 
                 rounded-lg shadow-lg hover:shadow-2xl cursor-pointer "
    >
      {children}
    </div>
  );
}
