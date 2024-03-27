import { FormError } from "@/components/form-error";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";


const NotadminPage = () => {
  return (
    <main>
      <FormError message="Vous n'avez pas l'autorisation, veuillez demander de l'aide a l'admin" />

  
        <div className=" justify-center flex mt-5 ">
        <Link href="/information" >
          <Button className="items-center flex justify-center flex-col">
            Information
          </Button>
          </Link>  
          </div>

    </main>
  );
}


export default NotadminPage