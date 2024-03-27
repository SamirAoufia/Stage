"use client"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { LoginSchema } from "@/schemas"
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
import {Button} from "@/components/ui/button"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { login } from "@/actions/login"

export const LoginForm =()=>{
  const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")


  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  })


  const onSubmit= (values: z.infer<typeof LoginSchema>) => {
    setError("")
    setSuccess("")


    startTransition(() => {
      login(values)
        .then((result) => {
        if(result?.Error) {
          setError(result.Error)
        }
    })
  })
}



  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonLabel="Pas de compte ?"
      backButtonHref="/information"
      showSocial
      >



      <Form {...form}>
        <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        >
          <div className="space-y-4">
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
          </div>
          
          <FormError message={error}/>
          <FormSuccess message={success}/>
          <Button
          disabled={isPending}
          typeof="submit"
          className="w-full"
          >
            Se connecter
          </Button>

        </form>
      </Form>

    </CardWrapper>
  )
}