"use client"

import { Button } from "@/components/ui/button";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-acc-ed";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Edit, MoreHorizontal } from "lucide-react";


type Props = {
    id: string;
};

export const ActionsNew = ({id}:Props) => {
    const {onopen} =useOpenAccount();
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="size-8 p-8">
                        <MoreHorizontal></MoreHorizontal>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem disabled={false} onClick={() => onopen(id)}>
                        <Edit className="size-4 mr-2"></Edit>
                        Edit
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};