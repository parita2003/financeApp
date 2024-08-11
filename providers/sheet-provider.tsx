"use client"

import { EditAccountSheet } from '@/features/accounts/components/edit-account';
import { NewAccountSheet } from '@/features/accounts/components/new-account-sheet'
import React from 'react'
import { useMountedState } from 'react-use'

function Sheetprovider() {
    const isMounted = useMountedState();
    if (!isMounted) return null;
  return (
    <>
        <NewAccountSheet></NewAccountSheet>
        <EditAccountSheet />
    </>
  )
}

export default Sheetprovider;
