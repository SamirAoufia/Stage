"use client"


import { useState, useEffect } from "react"

import { Role } from "@prisma/client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const AllUsers = () => {
  const [users, setUsers] = useState<null | { id: string; name: string | null; username: string | null; password: string | null; image: string | null; role: Role; }[]>(null)

  useEffect(() => {
    handleUserApi()
  }, [])


6


  const handleUserApi = async () => {
    const response = await fetch('../api',)
    const data = await response.json()
    setUsers(data)

  }

  return (
    <div> 
      <h1>Users : {}</h1>
      <ul>
        {users?.map(user => (

          <Table key={user.id}>
            <TableCaption>Users</TableCaption>
            <TableHead>
              <TableRow>
              <TableHeader>ID</TableHeader>
                <TableHeader>Username</TableHeader>
                <TableHeader>Name</TableHeader>
                <TableHeader>Role</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
              <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ))}
      </ul>
    </div>
  )
}

export default AllUsers
