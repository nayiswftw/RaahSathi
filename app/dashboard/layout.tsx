'use client'
import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Menu, Home, Map, Hotel, Utensils, Landmark, Save, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import React from 'react';


const menuItems = [
    { icon: Home, label: 'Explore', path: '/dashboard/explore' },
    { icon: Hotel, label: 'Hotels', path: '/dashboard/hotels' },
    { icon: Utensils, label: 'Restaurants', path: '/dashboard/restaurants' },
    { icon: Landmark, label: 'Tourist Spots', path: '/dashboard/spots' },
    { icon: Save, label: 'Saved', path: '/dashboard/saved' },
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
];

function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-white border-r shadow-lg flex flex-col justify-between">
                    <div>
                        <div className="flex items-center mb-6 px-2 hover:opacity-80 transition-opacity">
                            <Map className="h-7 w-7 text-blue-600" />
                            <Link href={'/'}>
                                <span className="ml-2 text-xl font-bold text-gray-800">RaahSathi</span>
                            </Link>
                        </div>
                        <nav>
                            <ul className="space-y-1">
                                {menuItems.map((item) => (
                                    <li key={item.label}>
                                        <a
                                            href={item.path}
                                            className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                                            aria-label={item.label}
                                        >
                                            <item.icon className="w-5 h-5 transition-colors" />
                                            <span className="ml-3 font-medium">{item.label}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                    <footer className="flex items-center justify-center p-4 border-t">
                        <SignedIn>
                            <UserButton showName />
                        </SignedIn>
                        <SignedOut>
                            <Link href={'/auth'}>
                                <Button className='px-12' size="lg" >Sign In</Button>
                            </Link>
                        </SignedOut>
                    </footer>
                </div>
            </aside>

            {/* Mobile header */}
            <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b sticky top-0 z-30">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="Toggle sidebar"
                >
                    <Menu className="h-6 w-6" />
                </button>
                <div className="flex items-center hover:opacity-80 transition-opacity">
                    <Map className="h-6 w-6 text-blue-600" />
                    <span className="ml-2 text-xl font-bold text-gray-800">RaahSathi</span>
                </div>
                <div className="w-10" />
            </div>

            {/* Main content */}
            <main className="lg:ml-64 min-h-screen transition-all duration-300">
                <div className="p-4 lg:p-8">
                    {children}
                </div>
            </main>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-gray-800 bg-opacity-50 lg:hidden z-30"
                    onClick={() => setIsSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}
        </div>
    );
}

export default DashboardLayout;