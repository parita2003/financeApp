"use client";

import { Button } from "@/components/ui/button";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-acc-ed";
import { Edit } from "lucide-react";
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
  {
    id: "actions",
    cell: ({ row }) => {
      const { onopen } = useOpenAccount();
      const rowData = row.original as ResponseType;

      return (
        h
      );
    },
  },
];
