"use client"

import { ColumnDef } from "@tanstack/react-table"
import {client} from '@/lib/hono'
import { InferResponseType } from "hono"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ResponseType = InferResponseType<typeof client.api.accounts.$get, 200>

export const columns: ColumnDef<ResponseType>[] = [

  {
    accessorKey: "name",
    header: "Name",
  },
]
