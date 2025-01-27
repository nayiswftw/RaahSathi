'use client'

import { SignIn } from "@clerk/clerk-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from '@/components/ui/button';
import { useRouter } from "next/navigation";

const AuthModal = () => {
  const router = useRouter();

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-background to-secondary/20 px-4">
      <BlurFade>
        <section className="relative z-30 p-8 max-w-md w-full">
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Welcome to RaahSathi</h1>
            <p className="text-muted-foreground">
              Sign In to start planning your perfect trip
            </p>
          </header>

          <SignIn withSignUp fallbackRedirectUrl={'/dashboard'} afterSignOutUrl={'/'} signUpFallbackRedirectUrl={'/dashboard'}/>

          <Button
            onClick={() => router.push("/")}
            variant={'ghost'}
            className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-foreground"
            aria-label="Return to home page"
          >
            Back to home
          </Button>
        </section>
      </BlurFade>
    </main>
  );
};

export default AuthModal;
