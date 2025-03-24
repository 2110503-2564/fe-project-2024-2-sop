"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/NavBar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  
  // Hide navbar on login and register pages
  const hideNavbarRoutes = ["/login", "/register"];
  if (hideNavbarRoutes.includes(pathname)) return null;

  return <Navbar />;
}
