"use client"
import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/features/accounts/hooks/use-new-accounts";

export default function Home() {
  const {onopen} =useNewAccount();
  return (
    <div>
      <Button onClick={onopen}>Add an Account</Button>
    </div>
  );
}
