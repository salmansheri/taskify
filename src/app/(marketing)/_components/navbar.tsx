import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center ">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between ">
        <Logo />
        <nav className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button className="" size="sm" variant="outline" asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/sign-up">Get Taskify For Free!</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
