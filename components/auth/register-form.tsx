"use client"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { RegisterSchema } from "@/schemas"
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
}from "@/components/ui/form"
import { useTransition, useState } from "react"
import {Input} from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Button} from "@/components/ui/button"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { register } from "@/actions/register"
import { Role } from "@prisma/client"

export const RegisterForm =()=>{
  const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")


  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      password: "",
      name: "",
    }
  })

  const onSubmit= (values: z.infer<typeof RegisterSchema>) => {
    setError("")
    setSuccess("")


    startTransition(() => {
      register(values)
        .then((valeur) => {
        setError(valeur.Error),
        setSuccess(valeur.success)
    })
  })
}



  return (
    <CardWrapper
      headerLabel="Welcome "
      backButtonLabel="Tout les utilisateurs"
      backButtonHref="/admin/users"
      showSocial = {false}
      >



      <Form {...form}>
        <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        >
          <div className="space-y-4">

          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input
                  {...field}
                  disabled={isPending}
                  placeholder="Nathan"
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
            />


            <FormField
            control={form.control}
            name="username"
            render={({field}) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                  {...field}
                  disabled={isPending}
                  placeholder="Samir"
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
            />

          <FormField
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input
                  {...field}
                  disabled={isPending}
                  placeholder="**********"
                  type="password"
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
            />

            <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={Role.Admin}>
                          Admin
                        </SelectItem>
                        <SelectItem value={Role.User}>
                          User
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>


            )}
            />
          </div>
          
          <FormError message={error}/>
          <FormSuccess message={success}/>
          <Button
          disabled={isPending}
          typeof="submit"
          className="w-full"
          >
            Créer un compte
          </Button>

        </form>
      </Form>

    </CardWrapper>
  )
}