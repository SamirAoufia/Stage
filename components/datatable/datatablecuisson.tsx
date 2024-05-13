"use client"

import React, { useState, useEffect } from 'react';
import {
  ChevronDownIcon,
} from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"




export function DataTablecuisson() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchDataFromAPI();
  }, []); 

  async function fetchDataFromAPI() {
    try{
      const response = await fetch(`../api/plaquedecuisson`);
      const data = await response.json();
      setData(data);
    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
    
  }
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "_time",
      header: "Temps",
      cell: ({ row }) => <div>{new Date(row.getValue("_time")).toLocaleString()}</div>,
    },
    {
      accessorKey: "Humidity",
      header: "Humidity",
      cell: ({ row }) => <div>{row.getValue("Humidity")}</div>,
    },
    {
      accessorKey: "Ds18b20Temp",
      header: "Ds18b20Temp",
      cell: ({ row }) => <div>{row.getValue("Ds18b20Temp")}</div>,
    },
    {
      accessorKey: "MlxTemp",
      header: "MlxTemp",
      cell: ({ row }) => <div>{row.getValue("MlxTemp")}</div>,
    },
    {
      accessorKey: "Power",
      header: "Power",
      cell: ({ row }) => <div>{row.getValue("Power")}</div>,
    },
    {
      accessorKey: "Temperature",
      header: "Temperature",
      cell: ({ row }) => <div>{row.getValue("Temperature")}</div>,
    },
    {
      accessorKey: "ThermocoupleTemp",
      header: "ThermocoupleTemp",
      cell: ({ row }) => <div>{row.getValue("ThermocoupleTemp")}</div>,
    },
    {
      accessorKey: "ThermocoupleTestoTemp",
      header: "ThermocoupleTestoTemp",
      cell: ({ row }) => <div>{row.getValue("ThermocoupleTestoTemp")}</div>,
    },
    
  ];
  



  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})


  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
      
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colonne <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
