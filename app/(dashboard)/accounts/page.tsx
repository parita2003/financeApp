"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNewAccount } from '@/features/accounts/hooks/use-new-accounts';
import React from 'react';
import { columns } from "./columns";
import { DataTable } from '@/components/DataTable';
import { useGetAccounts } from '@/features/accounts/use-get-account';

function AccountsPage() {
    const newAccount = useNewAccount();
    const accountsQuery = useGetAccounts();

    // Extracting the 'data' array from the API response
    const accounts = accountsQuery.data || []; // fallback to an empty array if data is undefined

    return (
        console.log(accounts),
        <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
            <Card className='border-none drop-shadow-sm'>
                <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
                    <CardTitle className='text-xl line-clamp-1'>Accounts Page</CardTitle>
                    <Button onClick={newAccount.onopen} size="sm">+ Add new</Button>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={accounts} />
                </CardContent>
            </Card>
        </div>
    );
}

export default AccountsPage;
