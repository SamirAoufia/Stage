'use client'
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/userAvatar";
import Image from "next/image";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between items-center p-4 rounded-xl shadow-sm">
        <div className="flex items-start">
          <Image src="/LSGlogo.svg" alt="logo" width={150} height={150} />
        </div>

        <div className="hidden md:flex gap-x-2 items-center ">
          <Button asChild variant={pathname === "/information" ? "default" : "outline"} className="hover:bg-[#AB9D62]">
            <Link href="/information">Information</Link>
          </Button>
          <Button asChild variant={pathname === "/plateau" ? "default" : "outline" } className="hover:bg-[#AB9D62]">
            <Link href="/plateau">Plateau</Link>
          </Button>
          <Button asChild variant={pathname === "/cuisson" ? "default" : "outline"} className="hover:bg-[#AB9D62]">
            <Link href="/cuisson">Cuisson</Link>
          </Button>
          <Button asChild variant={pathname === "/bluetooth" ? "default" : "outline"} className="hover:bg-[#AB9D62]">
            <Link href="/bluetooth">Bluetooth</Link>
          </Button>
          <Button asChild variant={pathname === "/documentation" ? "default" : "outline"} className="hover:bg-[#AB9D62]">
            <Link href="/documentation">Documentation</Link>
          </Button>
          <Button asChild variant={pathname === "/about" ? "default" : "outline"} className="hover:bg-[#AB9D62]">
            <Link href="/about">About</Link>
          </Button>
          
        </div>


      <div className="items-end">
        <UserButton />
      </div>
    </nav>
  );
};
