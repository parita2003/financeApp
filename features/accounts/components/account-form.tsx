import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { insertAccountSchema } from '@/db/schema'
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = insertAccountSchema.pick({
    name:true,
})

type FormValues = z.input<typeof formSchema>;
type Props = {
    id?:string;
    defaultValues?:FormValues;
    onSubmit: (values: FormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
}



export const AccountForm = ({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disabled,
}: Props) =>{
    const form= useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    })

    const handleSubmit = (values: FormValues) => {
        console.log({values});
        onSubmit(values);
    };

    const handleDelete = () => {
        onDelete?.();
    }
    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit) }
            className='space-y-4 pt-4'>
                <FormField
                    name="name"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                Name
                            </FormLabel>
                            <FormControl>
                                <Input 
                                    disabled={disabled} placeholder="eg credit card no." {...field}> 
                                </Input>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button className='w-full' >
                    {id? "Save Changes":"create account"}
                </Button>
                {!!id && 
                (<Button className='w-full' type='button' disabled={disabled} onClick={handleDelete} variant="outline">
                    <Trash className='mr-2 size-4'></Trash>
                    Delete Account
                </Button>)}
            </form>
        </Form>
    )
}

export default AccountForm;
