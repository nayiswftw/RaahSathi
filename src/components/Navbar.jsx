import React from 'react'
import { Button } from './ui/button'
import { SunIcon } from 'lucide-react'
import { MoonIcon } from 'lucide-react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router';
import { SignedIn, UserButton } from '@clerk/clerk-react';

function Navbar() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "light");

    useEffect(() => {
        const root = document.documentElement;
        localStorage.setItem("theme", theme);
        root.classList.toggle("dark", theme === "dark");
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };
    return (
        <>
            <nav className="fixed w-full bg-background/80 backdrop-blur-xl border-b shadow-sm z-50">
                <div className="container max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <h1 className="text-3xl font-extrabold text-primary tracking-tight">RaahSathi</h1>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Link to={'/explore'}>
                            <Button variant="ghost" className="hidden md:block">Explore</Button>
                        </Link>
                        <Button variant="ghost" className="hidden md:block">How It Works</Button>
                        <Button variant="ghost" className="hidden md:block">Pricing</Button>
                        <Link to={'/dashboard'}>
                            <Button className="hidden md:block">Get Started</Button>
                        </Link>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                        >
                            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        </Button>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
