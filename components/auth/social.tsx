"use client"

import { FaMicrosoft } from "react-icons/fa"
import { Button } from "@/components/ui/button"

export const Social = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button 
      variant="outline"
      size="lg"
      className="w-full"
      onClick={()=>{}}
      >
        <FaMicrosoft className="h-5 w-5"/>
      </Button>
    </div>
  )
}