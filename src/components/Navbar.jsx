import { MoonIcon, SunIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { SignedIn, UserButton } from '@clerk/clerk-react'
import { Link } from 'react-router'

export default function Navbar() {
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    )

    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark')
        document.documentElement.classList.add(theme)
        localStorage.setItem('theme', theme)
    }, [theme])

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

    return (
        <nav className='top-0 w-full bg-background/80 backdrop-blur-xl border-b border-border/40 shadow-sm z-50 transition-all duration-200'>
            <div className='container max-w-7xl mx-auto px-4 lg:px-8 py-4'>
                <div className='flex items-center justify-between'>
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <h1 className="text-2xl md:text-3xl font-extrabold text-primary tracking-tight hover:text-primary/90 transition-colors">
                            RaahSathi
                        </h1>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-2 md:space-x-4">
                        <div className="hidden md:flex items-center space-x-2">
                            <Link to="/dashboard/explore">
                                <Button variant="ghost" className="hover:bg-accent">
                                    Explore
                                </Button>
                            </Link>
                            <Button variant="ghost" className="hover:bg-accent"  onClick={() => window.location.href = '#how-it-works'} >
                                How It Works
                            </Button>
                            <Link to={'/dashboard/saves'}>
                            <Button variant="ghost" className="hover:bg-accent">
                                Saved Trips
                            </Button>
                            </Link>
                            <Link to="/dashboard">
                                <Button variant="default" className="hover:opacity-90">
                                    Get Started
                                </Button>
                            </Link>
                        </div>

                        {/* Theme Toggle & User Button */}
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hover:bg-accent"
                                aria-label="Toggle theme"
                                onClick={toggleTheme}
                            >
                                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            </Button>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}