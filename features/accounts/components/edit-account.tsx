import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useNewAccount } from "../hooks/use-new-accounts"
import AccountForm from "@/features/accounts/components/account-form";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateAccount } from "../api/use-create-account";
import { useOpenAccount } from "../hooks/use-open-acc-ed";
import { useGetAccount } from "../hooks/use-get-account";



const formSchema = insertAccountSchema.pick({
    name:true,
})

type FormValues = z.input<typeof formSchema>;
export const EditAccountSheet = () => {
    const {isOpen, onclose, id} = useOpenAccount();
    const accountQuery= useGetAccount(id);
    const mutation = useCreateAccount();
    const onSubmit = (values: FormValues ) => {
        mutation.mutate(values, {
            onSuccess: () => {
                onclose();
            },
        });
        console.log(values);
    }

    const defaultValues = accountQuery.data?{
        name: accountQuery.data.name
    }:{
        name: "",
    };

    return (
        <Sheet open={isOpen} onOpenChange={onclose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        Update the data
                    </SheetTitle>
                    <SheetDescription>
                        Edit all the necessary details
                    </SheetDescription>
                </SheetHeader>
                <AccountForm id={id} onSubmit={onSubmit} disabled={mutation.isPending}
                defaultValues={defaultValues}/>
            </SheetContent>
        </Sheet>
    )
}