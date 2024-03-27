import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";






export default function Home() {
  return (
      <main className="flex h-full flex-col items-center justify-center bg-[#AB9D62] ">
      <div className="space-y-6 text-center ">
        <h1 className="text-6xl font-semibold text-white drop-shadow-md">Smart Gastronomy Lab</h1>
        <p className="text-white text-lg">Monitoring web site</p>
        <div className=" flex items-center justify-center gap-x-5">
        <LoginButton>
        <Button variant="secondary" size="lg">Connexion</Button>
        </LoginButton>

        <Link href= "/information">
        <Button variant="secondary" size="lg">Information</Button>
        </Link>
        </div>
        </div>

      </main>
  );
}
