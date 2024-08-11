
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {client} from "@/lib/hono"
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$patch"]>;
type ResquestType = InferRequestType<typeof client.api.accounts[":id"]["$patch"]>["json"];

export const useEditAccount = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
    ResponseType,
    Error,
    ResquestType
    >({
        mutationFn: async (json) => {
            const response= await client.api.accounts.$post({json});
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Account Created")
            queryClient.invalidateQueries({queryKey: ["accounts"]});
        }
        ,onError: () => {
            toast.error("Error creating account");
        }
    })
    return mutation;
}