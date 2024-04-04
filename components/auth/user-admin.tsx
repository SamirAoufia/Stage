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
  const [users, setUsers] = useState<null | { id: string; name: string | null; username: string | null; password: string | null; image: string | null; role: Role; error: string | undefined; success: string | undefined; }[]>(null)
  const [isPending, startTransition] = useTransition()
  useEffect(() => {
    handleUserApi()
  }, [])

  const password = "123456"

  const reset = async (id: string) => {
    startTransition(() => {
      resetPassword({ id, password })
        .then((response) => {
          const updatedUsers = users?.map(user => {
            if (user.id === id) {
              return {
                ...user,
                error: response.Error,
                success: response.success
              };
            }
            return user;
          });
          setUsers(updatedUsers || null);
        });
    });
  };

  const handleUserApi = async () => {
    const response = await fetch('../api/admin',)
    const data = await response.json()
    // Ajoutez des champs error et success à chaque utilisateur avec une valeur initiale undefined
    const formattedUsers = data.map((user: any) => ({
      ...user,
      error: undefined,
      success: undefined
    }));
    setUsers(formattedUsers);
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
                <TableHead>Reset</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell><div className=" flex justify-center ">
                <Button onClick={(event) => reset(user.id)}  className="hover:bg-[#AB9D62]">Reset</Button>
              </div></TableCell>
              
              </TableRow>
              <TableRow>
                <TableCell colSpan={5}>
                  {/* Affichez le message d'erreur ou de succès uniquement s'il existe pour cet utilisateur */}
                  {user.error && <FormError message={user.error} />}
                {user.success && <FormSuccess message={user.success} />}
                </TableCell>
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

