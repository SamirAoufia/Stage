"use client"


import { useState, useEffect,  useTransition } from "react"

import { Role } from "@prisma/client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { resetPassword } from "@/actions/reset-password"
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";




const AllUsers = () => {
  const [users, setUsers] = useState<null | { id: string; name: string | null; username: string | null; password: string | null; image: string | null; role: Role; }[]>(null)
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()
  useEffect(() => {
    handleUserApi()
  }, [])

  const password = "123456"

  const reset = async (id: string) => {
    setError("")
    setSuccess("")

    startTransition(() => {
      resetPassword({ id, password })
        .then((valeur) => {
        setError(valeur.Error),
        setSuccess(valeur.success)
        });
    });
  };



  const handleUserApi = async () => {
    const response = await fetch('../api/admin',)
    const data = await response.json()
    setUsers(data)

  }

  return (
    <main > 
    <div className="flex gap-x5"> 
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
              <div className="mt-5 flex justify-center ">
                <Button onClick={(event) => reset(user.id)} >Reset</Button>
                <FormError message={error} />
                <FormSuccess message={success} />
                
              </div>
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
