"use client"
import  Image  from "next/image";
import { 
  Card,
  CardContent,
  CardHeader
} from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/use-current-user";
import { BackButton } from "@/components/auth/BackButton";




const SettingsForm = () => {
  const session = useCurrentUser()


  return (
    <Card>
      <CardHeader>
        <p className="justify-center flex text-xl underline">Settings</p>
      </CardHeader>
      <CardContent >
      <div className="flex justify-center mb-5"> 
          <Image src="/Shadcn.jpg" alt="shadcn" width={200} height={200} className="rounded-full" />
      </div>

      <p className=" border border-gray-300 rounded-lg p-3 text-lg mb-4 ">Nom : {session?.name}</p>
      <p className=" border border-gray-300 rounded-lg p-3 text-lg mb-4 ">Role : {session?.role}</p>
      <p className="border border-gray-300 rounded-lg p-3 text-lg  ">Username : {session?.username}</p>
      </CardContent>
      <BackButton label="Reset mot de passe" href="/resetmdp"/>
    </Card>
  );
}



export default SettingsForm