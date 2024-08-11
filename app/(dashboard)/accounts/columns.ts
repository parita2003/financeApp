"use client";

import { ColumnDef } from "@tanstack/react-table";
import { client } from '@/lib/hono';
import { InferResponseType } from "hono";
import { ActionsNew } from "./action";

// Define the type for a single account item.
export type ResponseType = InferResponseType<typeof client.api.accounts.$get, 200>["data"][0];

export const columns: ColumnDef<ResponseType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <ActionNew id={row.original.id} />
  // },
];
