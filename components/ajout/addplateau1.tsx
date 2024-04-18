'use client'
import { useTransition, useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
}from "@/components/ui/form"
import { PlateauSchema } from "@/schemas"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { addPlateau1 } from "@/actions/plateau1ajout"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Card } from "../ui/card"



export const PlateauFormAjoutPersonne = () => {

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    typeof new Date(new Date().setHours(0, 0, 0, 0)) === 'string' ? new Date(new Date(new Date().setHours(0, 0, 0, 0))) : new Date(new Date().setHours(0, 0, 0, 0))
  );

  const [startHour, setStartHour] = useState<number>(0);
  const [startMinute, setStartMinute] = useState<number>(0);
  const [endHour, setEndHour] = useState<number>(0);
  const [endMinute, setEndMinute] = useState<number>(0);

  const form = useForm<z.infer<typeof PlateauSchema>>({
    resolver: zodResolver(PlateauSchema),
    defaultValues: {
      name: "",
      date: "",
      debutheure: "",
      debutminute: "",
      finheure: "",
      finminute: "",
    }
  })

  const onSubmit = (values: z.infer<typeof PlateauSchema>) => {
    setError("")
    setSuccess("")

    startTransition(() => {
      addPlateau1(values)
        .then((value) => {
          setError(value.Error),
          setSuccess(value.success)
        })
    })
    
  }


  return (

    <Card className="p-5">
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)}>

        <div className="space-y-4">
          <FormField control={form.control }
            name="name"
            render={({ field }) => (
              <FormItem> 
                <FormLabel > Nom de la personne</FormLabel>
                <FormControl>
                  <Input {...field}
                    disabled={isPending}
                    placeholder="Nathan"/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
            />

        <FormField control={form.control }
            name="description"
            render={({ field }) => (
              <FormItem> 
                <FormLabel> Description </FormLabel>
                <FormControl>
                  <Input {...field}
                    disabled={isPending}
                    placeholder="Mange doucement"/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
            />

          <FormField control={form.control }
            name="date"
            render={({ field }) => (
              <FormItem> 
                <FormLabel> date </FormLabel>
                <FormControl>
                <Input {...field}
                    disabled={isPending}
                    placeholder="2022-01-01"
                    type="date"
                    
                  />
                    
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
            />
        <FormField control={form.control }
            
            name="debutheure"
            render={({ field }) => (
              <FormItem> 
                <FormLabel> Debut heure </FormLabel>
                <FormControl>
                <Input {...field}
        type="number"
        min={0}
        max={23}
      />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
            />
            
        <FormField control={form.control }
            name="debutminute"
            render={({ field }) => (
              <FormItem> 
                <FormLabel> Debut minute </FormLabel>
                <FormControl>
                <Input {...field}
        type="number"
        min={0}
        max={59}
      />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
            />

        <FormField control={form.control }
            name="finheure"
            render={({ field }) => (
              <FormItem> 
                <FormLabel> fin heure </FormLabel>
                <FormControl>
                <Input {...field}
        type="number"
        min={0}
        max={23}
      />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
            />
            

            <FormField control={form.control }
            name="finminute"
            render={({ field }) => (
              <FormItem> 
                <FormLabel> fin minute </FormLabel>
                <FormControl>
                <Input {...field}
        type="number"
        min={0}
        max={59}
      />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
            />
            </div>

        
        
        <div className="mt-5  md-5 ">
        <FormError message={error}/>
          <FormSuccess message={success}/>
        </div>
          <div className="mt-5">
          <Button
          disabled={isPending}
          typeof="submit"
          className="w-full"
          >
            enregistrer
          </Button>
          </div>
      </form>


    </Form>  
    </Card>
  )










}
