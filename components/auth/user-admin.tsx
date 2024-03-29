"use client"


import { useState, useEffect } from "react"

import { Role } from "@prisma/client"

import {
  Table,
  TableBody,
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
    const response = await fetch('../api/admin',)
    const data = await response.json()
    setUsers(data)

  }

  return (
    <main>
    <div> 
      <ul>
        {users?.map(user => (
          <div  key={user.id} className="border border-gray-300 rounded-md p-4 mb-4">

          <Table>
            <TableHeader>
              <TableRow>
              <TableHead>ID</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
              <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          </div>
        ))}
      </ul>
    </div>
    </main>
  )
}

export default AllUsers
