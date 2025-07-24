"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      // If not signed in, redirect to sign-in page
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isSignedIn) {
    // Loading or redirecting
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to your Dashboard!</h1>
      {/* Add your dashboard content here */}
    </div>
  );
}
