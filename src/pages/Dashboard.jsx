import { useEffect, useState, useMemo } from 'react';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import { CompassIcon, LayoutDashboardIcon, PlaneIcon, SaveIcon, MapIcon, CalendarIcon, StarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { Outlet } from 'react-router';
import { useAuth, useUser } from '@clerk/clerk-react';
import { SparklesText } from '@/components/ui/sparkles-text';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getTrips } from '@/lib/supabaseRequests'; // Import your data fetching function

const Dashboard = () => {
    const location = useLocation();
    const isRootPath = location.pathname == '/dashboard';
    const navigate = useNavigate();
    const { userId, isLoaded, getToken } = useAuth();
    const { user } = useUser();
    const [stats, setStats] = useState({
        totalTrips: 0,
        upcomingTrips: 0,
        savedPlaces: 0,
        recentDestinations: []
    });
    const [activityItems, setActivityItems] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (isLoaded && !userId) {
            navigate('/auth');
        }
    }, [userId, isLoaded, navigate]);

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            if (!userId) return;

            try {
                const token = await getToken({ template: 'supabase' });
                const trips = await getTrips({ userId, token });

                if (!mounted) return;

                setStats({
                    totalTrips: trips.length,
                    upcomingTrips: "This Feature is not available yet",
                    savedPlaces: "This Feature is not available yet",
                    recentDestinations: trips.map(trip => ({
                        name: trip.trip_data.config.destination,
                        date: trip.trip_data.date,
                    }))
                });

                setActivityItems(trips.map(trip => ({
                    text: `Created new trip to ${trip.trip_data.config.destination}`,
                    time: trip.trip_data.date
                })));
            } catch (error) {
                console.error('Error fetching trips:', error);
            }
        };

        fetchData();
        return () => { mounted = false; };
    }, [userId, getToken]);

    const links = useMemo(() => [
        { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboardIcon /> },
        { href: '/dashboard/explore', label: 'Explore', icon: <CompassIcon /> },
        { href: '/dashboard/trip', label: 'Create Trip', icon: <PlaneIcon /> },
        { href: '/dashboard/saves', label: 'Saved', icon: <SaveIcon /> },
    ], []);

    return (
        <div className={cn(
            "rounded-md flex flex-col md:flex-row w-full flex-1 overflow-x-hidden ",
            "h-screen")}>
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className='mt-8 flex flex-col gap-2'>
                            {links.map((link, index) => (
                                <SidebarLink key={index} link={link} />
                            ))}
                        </div>
                    </div>
                </SidebarBody>
            </Sidebar>
            <div className="flex flex-1 flex-col">
                {isRootPath ? (
                    <div className="flex flex-1 flex-col p-6 md:p-8 overflow-y-auto">
                        <div className="grid gap-4 md:gap-6 mb-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold">Welcome back, {user?.firstName}!</h1>
                                    <p className="text-muted-foreground">Here's what's happening with your travels</p>
                                </div>
                                <Link to="/dashboard/trip">
                                    <Button>Plan New Trip</Button>
                                </Link>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[120px]">
                            <Card className="p-4 flex flex-col justify-between hover:shadow-lg transition-shadow">
                                <p className="text-sm text-muted-foreground">Total Trips</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold">{stats.totalTrips}</span>
                                    <PlaneIcon className="h-8 w-8 text-primary opacity-75" />
                                </div>
                            </Card>
                            <Card className="p-4 flex flex-col justify-between hover:shadow-lg transition-shadow">
                                <p className="text-sm text-muted-foreground">Upcoming Trips</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold">{stats.upcomingTrips}</span>
                                    <CalendarIcon className="h-8 w-8 text-primary opacity-75" />
                                </div>
                            </Card>
                            <Card className="p-4 flex flex-col justify-between hover:shadow-lg transition-shadow">
                                <p className="text-sm text-muted-foreground">Saved Places</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold">{stats.savedPlaces}</span>
                                    <StarIcon className="h-8 w-8 text-primary opacity-75" />
                                </div>
                            </Card>
                            <Card className="md:col-span-2 md:row-span-2 p-4 hover:shadow-lg transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold">Recent Destinations</h3>
                                    <Link to="/dashboard/saves" className="text-sm text-primary hover:underline">
                                        View all
                                    </Link>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {stats.recentDestinations.map((dest, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-16 h-16 rounded-lg bg-muted/10 flex items-center justify-center">
                                                <MapIcon className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-medium">{dest.name}</p>
                                                <p className="text-sm text-muted-foreground">{dest.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                            <Card className="md:row-span-2 p-4 hover:shadow-lg transition-shadow overflow-hidden">
                                <h3 className="font-semibold mb-4">Recent Activity</h3>
                                <div className="space-y-4">
                                    {activityItems.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                                            <div>
                                                <p className="text-sm">{item.text}</p>
                                                <p className="text-xs text-muted-foreground">{item.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </div>
                ) : <Outlet />}
            </div>
        </div>
    );
};

export default Dashboard;

export const Logo = () => {
    return (
        <Link
            to="/"
            className="font-normal flex space-x-2 items-center text-sm text-black relative z-20"
        >
            <img src="/logo.svg" alt="RaahSathi Logo" className="h-6 w-6" />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-black dark:text-white whitespace-pre"
            >
                <SparklesText text={"RaahSathi"} className={"text-xl"} />
            </motion.span>
        </Link>
    );
};

export const LogoIcon = () => {
    return (
        <Link
            to="#"
            className="font-normal flex space-x-2 items-center text-sm text-black relative z-20"
        >
            <img src="/logo.svg" alt="RaahSathi Logo" className="h-6 w-6" />
        </Link>
    );
};