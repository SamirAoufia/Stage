'use client';
import { useTransition, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormLabel, FormItem, FormMessage } from "@/components/ui/form";
import { CuissonSchema } from "@/schemas";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { addCuisson } from "@/actions/cuissonajout";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export const CuissonFormAjoutPersonne = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof CuissonSchema>>({
    resolver: zodResolver(CuissonSchema),
    defaultValues: {
      plat: "",
      description: "",
      date: "",
      debutheure: "",
      debutminute: "",
      finheure: "",
      finminute: "",
    }
  });

  const onSubmit = (values: z.infer<typeof CuissonSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      addCuisson(values)
        .then((value) => {
          setError(value.Error);
          setSuccess(value.success);
        });
    });
  };

  return (
    <Card className="p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="plat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plat</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="Steak de spiruline" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="Steak + poivre" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /><FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} type="date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

          <div className="border rounded p-2">
             <div className="font-semibold">Debut</div>
            <div className="grid grid-cols-2 gap-x-4">

              
              <FormField
                control={form.control}
                name="debutheure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Heure</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min={0} max={23} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            
              <FormField
                control={form.control}
                name="debutminute"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minute</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min={0} max={59} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
              </div>
              
              <div className="border rounded p-2">
             <div className="font-semibold">Fin</div>
            <div className="grid grid-cols-2 gap-x-4">

              <FormField
                control={form.control}
                name="finheure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Heure</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min={0} max={23} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="finminute"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minute</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min={0} max={59} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              </div>
              </div>





            </div>
         
          <div className="mt-5">
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button disabled={isPending} typeof="submit" className="w-full">Enregistrer</Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};
