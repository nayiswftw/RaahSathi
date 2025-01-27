'use client'

// React and hooks
import React, { useEffect, useState } from 'react'

// External libraries
import { Label } from '@radix-ui/react-label'
import { Minus, Plus } from 'lucide-react'

// Components
import { toast } from 'sonner'
import CountrySelect from '@/components/country-select'
import RegionSelect from '@/components/region-select'
import TripData from '@/components/TripData'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button'
import { MultiStepLoader } from '@/components/ui/multi-step-loader'

// Utils and constants
import { AI_PROMPT } from '@/lib/Constants'
import { chatSession } from '@/lib/Gemini'

const BUDGETS = [
    { title: 'Budget', desc: 'Travel Economically', value: 'Budget' },
    { title: 'Moderate', desc: 'Enjoy balanced luxury.', value: 'Moderate' },
    { title: 'Luxury', desc: 'Indulge in premium experiences', value: 'Luxury' }
]

const TRIPTYPE = [
    { title: 'Solo', desc: 'Your personal escape.', value: '1' },
    { title: 'Family', desc: 'Perfect for family trips.', value: '3' },
    { title: 'Friends', desc: 'Fun and adventure guaranteed.', value: '5' }
]

const loadingStates = [
    { text: 'Analyzing your preferences' },
    { text: 'Generating your itinerary' },
    { text: 'Finalizing your trip' }
]

interface TripFormData {
    destination: string;
    duration: string;
    budget: string;
    companion: string;
}

interface TripResponse {
    config: TripFormData;
    data: any;
    userID: string;
}

export default function TripPage() {
    const [countryCode, setCountryCode] = useState("");
    const [day, setDay] = useState(1);
    const [destination, setDestination] = useState("");
    const [formData, setFormData] = useState<TripFormData>({
        destination: destination,
        duration: `${day}`,
        budget: '',
        companion: ''
    });
    const [data, setData] = useState<TripResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setFormData((prev) => ({ ...prev, duration: `${day}` }));
    }, [day]);

    useEffect(() => {
        setFormData((prev) => ({ ...prev, destination: destination }));
    }, [destination]);

    function onClick(adjustment: number) {
        setDay(day + adjustment);
    }

    const isFormValid = () => {
        return formData.destination &&
            formData.duration &&
            formData.budget &&
            formData.companion;
    };

    async function generateTrip() {
        try {
            if (!isFormValid()) {
                toast('Please fill in all fields');
            }

            setIsLoading(true);
            const FINAL_PROMPT = AI_PROMPT
                .replace('{destination}', formData.destination)
                .replace('{days}', formData.duration)
                .replace('{companions}', formData.companion)
                .replace('{budget}', formData.budget);

            const result = await chatSession.sendMessage(FINAL_PROMPT);
            const responseText = await result.response.text();

            try {
                const parsedData = JSON.parse(responseText);
                setData({
                    config: formData,
                    data: parsedData,
                    userID: crypto.randomUUID()
                });
            } catch (e) {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error('Trip generation error:');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            {isFormValid() &&
                <MultiStepLoader loop={false} loading={isLoading} loadingStates={loadingStates} />
            }
            <div className="h-screen">
                <div className='w-full h-full flex flex-col md:flex-row rounded-3xl border shadow-2xl bg-white/80 backdrop-blur-md transition-all hover:shadow-primary/20'>
                    <div className='w-full md:w-1/2 relative overflow-y-scroll'>
                        <div className='container mx-auto p-6 md:p-12'>
                            <div className="space-y-4 mb-10">
                                <h1 className='font-bold text-4xl tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'>
                                    Plan Your Dream Trip
                                </h1>
                                <p className='text-muted-foreground'>Fill in the details below to create your perfect itinerary</p>
                            </div>

                            <div className='space-y-10'>
                                <div className='space-y-3 '>
                                    <Label className="text-base font-semibold inline-block">
                                        Destination
                                    </Label>
                                    <div className='flex items-center space-x-4'>
                                        <CountrySelect
                                            className="w-1/2"
                                            onChange={(value) => setCountryCode(value)}
                                            placeholder="Country"
                                            priorityOptions={['IN']}
                                        />
                                        <RegionSelect
                                            onChange={(value) => setDestination(value)}
                                            className="w-1/2"
                                            countryCode={countryCode}
                                        />
                                    </div>
                                </div>

                                <div className='space-y-3'>
                                    <Label className="text-base font-semibold block">
                                        Duration
                                    </Label>
                                    <Drawer>
                                        <DrawerTrigger asChild>
                                            <Button size={'lg'} className='w-full text-md p-5'>Select Days</Button>
                                        </DrawerTrigger>
                                        <DrawerContent>
                                            <div className="mx-auto w-full max-w-sm">
                                                <DrawerHeader>
                                                    <DrawerTitle>Adjust Days</DrawerTitle>
                                                    <DrawerDescription>Set your trip duration.</DrawerDescription>
                                                </DrawerHeader>
                                                <div className="p-4 pb-0">
                                                    <div className="flex items-center justify-center space-x-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-8 w-8 shrink-0 rounded-full"
                                                            onClick={() => onClick(-1)}
                                                            disabled={day <= 1}
                                                        >
                                                            <Minus />
                                                            <span className="sr-only">Decrease</span>
                                                        </Button>
                                                        <div className="flex-1 text-center">
                                                            <div className="text-7xl font-bold tracking-tighter">
                                                                {day}
                                                            </div>
                                                        </div>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-8 w-8 shrink-0 rounded-full"
                                                            onClick={() => onClick(1)}
                                                            disabled={day >= 7}
                                                        >
                                                            <Plus />
                                                            <span className="sr-only">Increase</span>
                                                        </Button>
                                                    </div>
                                                </div>
                                                <DrawerFooter>
                                                    <DrawerClose asChild>
                                                        <Button>Submit</Button>
                                                    </DrawerClose>
                                                    <DrawerClose asChild>
                                                        <Button variant="outline">Cancel</Button>
                                                    </DrawerClose>
                                                </DrawerFooter>
                                            </div>
                                        </DrawerContent>
                                    </Drawer>
                                </div>

                                <div className='space-y-4'>
                                    <Label className="text-base font-semibold block">Budget Range</Label>
                                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                                        {BUDGETS.map((budget) => (
                                            <Card
                                                key={budget.value}
                                                className='p-5 hover:scale-[1.02] hover:shadow-lg hover:border-primary/50 cursor-pointer transition-all duration-300'
                                            >
                                                <Label className='flex items-center gap-4 cursor-pointer'>
                                                    <Input
                                                        type='radio'
                                                        name='budget'
                                                        onChange={() => setFormData({ ...formData, budget: budget.value })}
                                                        className='w-5 h-5 accent-primary'
                                                    />
                                                    <div>
                                                        <h3 className='font-semibold text-lg'>{budget.title}</h3>
                                                        <p className='text-sm text-muted-foreground'>{budget.desc}</p>
                                                    </div>
                                                </Label>
                                            </Card>
                                        ))}
                                    </div>
                                </div>

                                <div className='space-y-4'>
                                    <Label className="text-base font-semibold block">Travel With</Label>
                                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                                        {TRIPTYPE.map((type) => (
                                            <Card
                                                key={type.value}
                                                className='p-5 hover:scale-[1.02] hover:shadow-lg hover:border-primary/50 cursor-pointer transition-all duration-300'
                                            >
                                                <Label className='flex items-center gap-4 cursor-pointer'>
                                                    <Input
                                                        type='radio'
                                                        name='tripType'
                                                        onChange={() => setFormData({ ...formData, companion: type.value })}
                                                        className='w-5 h-5 accent-primary'
                                                    />
                                                    <div>
                                                        <h3 className='font-semibold text-lg'>{type.title}</h3>
                                                        <p className='text-sm text-muted-foreground'>{type.desc}</p>
                                                    </div>
                                                </Label>
                                            </Card>
                                        ))}
                                    </div>
                                </div>

                                <InteractiveHoverButton
                                    onClick={generateTrip}
                                    className="w-full py-4 text-lg font-semibold rounded-xl"
                                >
                                    Create My Itinerary
                                </InteractiveHoverButton>
                            </div>
                        </div>
                    </div>
                    <div className='w-full md:w-1/2 relative bg-gradient-to-br from-primary/20 to-primary/40'>
                        <video
                            className='absolute object-cover w-full h-full mix-blend-overlay opacity-90'
                            src="/preloader.mp4"
                            muted
                            autoPlay
                            loop
                        />
                    </div>
                </div>
            </div>
            {data && <TripData trip={data} />}
        </>

    )
}
