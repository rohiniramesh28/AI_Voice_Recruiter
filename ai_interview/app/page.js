"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";

export default function Page() {
  const { isSignedIn } = useUser();

  return (
    <div>
      <h2>Welcome</h2>
      <Button variant="ghost">Dashboard</Button>
      {isSignedIn ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <SignInButton mode="modal">
          <Button variant="outline">Sign In</Button>
        </SignInButton>
      )}
    </div>
  );
}
