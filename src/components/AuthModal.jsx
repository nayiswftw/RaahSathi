import { SignIn, SignUp, useAuth } from "@clerk/clerk-react";
import { BlurFade } from "./ui/blur-fade";
import { useNavigate } from "react-router";
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

const AuthModal = () => {
  const navigate = useNavigate();

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

          <SignIn withSignUp />

          <Button
            onClick={() => navigate("/")}
            variant="ghost"
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

export const isUserLoggedIn = () => {
  const auth = useAuth();
  return !!auth.userId;
};