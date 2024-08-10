import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useNewAccount } from "../hooks/use-new-accounts"
import AccountForm from "@/features/accounts/components/account-form";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateAccount } from "../api/use-create-account";



const formSchema = insertAccountSchema.pick({
    name:true,
})

type FormValues = z.input<typeof formSchema>;
export const NewAccountSheet = () => {
    const {isOpen, onclose} = useNewAccount();
    const mutation = useCreateAccount();
    const onSubmit = (values: FormValues ) => {
        mutation.mutate(values, {
            onSuccess: () => {
                onclose();
            },
        });
        console.log(values);
    }
    return (
        <Sheet open={isOpen} onOpenChange={onclose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        New Account
                    </SheetTitle>
                    <SheetDescription>
                        Create new account to tract your transactions
                    </SheetDescription>
                </SheetHeader>
                <AccountForm onSubmit={onSubmit} disabled={mutation.isPending}
                defaultValues={{
                    name: " ",
                }}/>
            </SheetContent>
        </Sheet>
    )
}