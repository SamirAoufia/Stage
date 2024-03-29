"use client"
import { RoleGate } from "@/components/auth/role-gate";
import AllUsers from "@/components/auth/user-admin";



const UsersPage = () => {
 

  return (
    <RoleGate allowedRole="Admin">
    <AllUsers />
  </RoleGate>
  )
}

export default UsersPage
