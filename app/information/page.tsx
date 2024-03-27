"use client"
import  Image  from "next/image";
import { 
  Card,
  CardContent,
  CardHeader
} from "@/components/ui/card";
import { BackButton } from "@/components/auth/BackButton";




const InformationPage =  () => {


  return (
    <div className="flex flex-col items-center mt-5 overflow-y-auto">
      <Card>
      <CardHeader>
        <p className="justify-center flex text-xl underline">Information Admin</p>
      </CardHeader>
      <CardContent >
      {/* <div className="flex justify-center mb-5"> 
          <Image src="/Nathan.jpg" alt="Nathan" width={200} height={200} className="rounded-full" />
      </div> */}
      
      <p className="  text-md mb-4 underline " >Contacter l&apos;admin pour la creation d&apos;un compte ou tout autre problème </p>
      <div className="flex gap-x-5 justify-center">
      <p className=" border border-gray-300 rounded-lg p-3 text-lg mb-4 ">Nathan Codutti</p>
      <p className="text-[#AB9D62] border border-gray-300 rounded-lg p-3 text-lg mb-4">
			<a href="mailto:nathan.codutti@uliege.be">nathan.codutti@uliege.be</a>
      </p>
      </div>
      <BackButton
          label="Retour à la page de connexion"
          href="auth/login"
          />
      </CardContent>
    </Card>

    </div>
  );
}



export default InformationPage