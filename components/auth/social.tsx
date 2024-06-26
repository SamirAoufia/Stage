"use client"

import { FaMicrosoft } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"


export const Social = () => {





  return (
    <div className="flex items-center w-full gap-x-2">
      <Button 
      variant="outline"
      size="lg"
      className="w-full"
      onClick={async () => {
        signIn('azure-ad', {
          callbackUrl: DEFAULT_LOGIN_REDIRECT
        })
      
      
      }}
      >
        <FaMicrosoft className="h-5 w-5"/>
      </Button>
    </div>
  )
}