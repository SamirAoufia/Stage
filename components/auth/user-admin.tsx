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
import { deleteUser } from "@/actions/delete-user"




const AllUsers = () => {
  const [users, setUsers] = useState<null | { id: string; name: string | null; username: string | null; password: string | null; image: string | null; role: Role; error: string | undefined; success: string | undefined; }[]>(null)
  const [isPending, startTransition] = useTransition()
  useEffect(() => {
    handleUserApi()
  }, [])

  const password = "123456" // Mot de passe par défaut pour la réinitialisation

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

  const deleteuser = async (id: string) => {
    startTransition(() => {
      deleteUser({ id })
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
  }

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
    <main className="px-4 md:px-8 lg:px-16" > 
    <div className="flex flex-col md:flex-row gap-x-5 justify-center"> 
      <ul className="w-full md:w-auto">
        {users?.map(user => (
          <div  key={user.id} className="flex border border-gray-300 rounded-md p-4 mb-4">

          <Table >
            <TableHeader>
              <TableRow>
              <TableHead>ID</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Reset MDP</TableHead>
                <TableHead>Supprimer Utilisateur</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                <Button onClick={(event) => reset(user.id)}  className="hover:bg-[#AB9D62]">Reset</Button>
              </TableCell>
              <TableCell>
                <Button onClick={(event) => deleteuser(user.id)}  className="hover:bg-[#AB9D62]">Supprimer</Button>
              </TableCell>
              
              </TableRow>
              <TableRow>
                <TableCell colSpan={6}>
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

