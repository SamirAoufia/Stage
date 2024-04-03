"use client"
import { RoleGate } from "@/components/auth/role-gate";
import AllUsers from "@/components/auth/user-admin";



const UsersPage = () => {
 

  return (
    <div className="flex justify-center">
    <RoleGate allowedRole="Admin">
    <AllUsers />
  </RoleGate>
  </div>
  )
}

export default UsersPage
