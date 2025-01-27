"use client"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CalendarDays, MapPin, Users2, Plane, List, Clock, Bell } from 'lucide-react'
import Link from 'next/link'
import { useIsMobile } from '@/hooks/use-mobile'

export default function Dashboard() {
  const isMobile = useIsMobile()

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back, Traveler!</h1>
          <p className="text-muted-foreground">Track your adventures and plan new journeys</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Link href="/dashboard/trip">
            <Button className="flex gap-2">
              <Plane className="h-4 w-4" />
              Plan New Trip
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Plane, label: 'Active Trips', value: '3', trend: '+1' },
          { icon: CalendarDays, label: 'Upcoming', value: '2', trend: '0' },
          { icon: MapPin, label: 'Destinations', value: '12', trend: '+3' },
          { icon: Users2, label: 'Travel Buddies', value: '8', trend: '+2' },
        ].map((stat, index) => (
          <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <stat.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium">{stat.label}</span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold">{stat.value}</span>
                <span className="text-xs text-muted-foreground">{stat.trend} this month</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Upcoming Trips */}
        <Card className="md:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Upcoming Trips</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {[
              {
                title: 'Nepal Mountain Trek',
                location: 'Kathmandu, Nepal',
                date: 'March 15 - 25',
                status: 'Confirmed'
              },
              {
                title: 'Thailand Beach Tour',
                location: 'Phuket, Thailand',
                date: 'April 10 - 20',
                status: 'Planning'
              }
            ].map((trip, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Plane className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{trip.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      trip.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {trip.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{trip.location}</p>
                  <p className="text-sm text-muted-foreground">{trip.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Activity Feed */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <Button variant="ghost" size="sm"><Clock className="w-4 h-4" /></Button>
          </div>
          <div className="space-y-4">
            {[
              { text: 'Booked flights for Nepal trip', time: '2 hours ago' },
              { text: 'Added 2 new travel buddies', time: '5 hours ago' },
              { text: 'Updated Thailand itinerary', time: '1 day ago' },
              { text: 'Completed Bali trip review', time: '2 days ago' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.text}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}