import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Autoplay from "embla-carousel-autoplay"
import { Input } from '@/components/ui/input'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import TripData from './TripData'
import { chatSession } from '@/lib/Gemini'
import { AI_PROMPT } from '@/lib/Constants'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebaseConfig'
import { Link } from 'react-router'
import { useEffect } from 'react'

function CreateTrip() {
    const [destination, setDestination] = useState('');
    const [duration, setDuration] = useState('');
    const [companion, setCompanion] = useState('');
    const [budget, setBudget] = useState('');
    const [data, setData] = useState([]);

    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTripData();
    }, []);

    const handleSubmit = async () => {
        if (!destination || !duration || !companion || !budget) {
            toast({
                title: "Please complete all fields before proceeding!",
                variant: 'destructive',
            });
            return;
        }

        const formData = {
            destination,
            duration,
            companion,
            budget
        };

        console.log(formData);

        const FINAL_PROMPT = AI_PROMPT
            .replace('{destination}', formData.destination)
            .replace('{days}', formData.duration)
            .replace('{companions}', formData.companion)
            .replace('{budget}', formData.budget);

        try {
            const result = await chatSession.sendMessage(FINAL_PROMPT);
            // const responseData = await result.response.text();
            console.log(result.response.text());

            const docId = auth.currentUser.uid;
            await setDoc(doc(db, "TripData", docId), {
                config: formData,
                data: JSON.parse(result.response.text()),
                id: docId
            });
            
            await fetchTripData();
        } catch (error) {
            console.error("Error creating trip:", error);
        }
    };

    const fetchTripData = async () => {
        const docId = auth.currentUser.uid;
        const docRef = doc(db, 'TripData', docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document:", docSnap.data());
            setData(docSnap.data());
        } else {
            console.log('No such document');
        }
    };

    return (
        <>
            <div className='overflow-hidden relative h-screen'>
                <video className='absolute object-cover z-0 w-full h-full' src="/preloader.mp4" muted autoPlay loop></video>
                <div className='flex flex-col md:flex-row h-full p-5 relative z-10'>
                    {/* LEFT SECTION */}
                    <Link to='/'>
                        <Button size='lg' className='absolute rounded-full bg-transparent text-white z-10 m-5' variant='ghost' >&#8592; Go back</Button>
                    </Link>
                    <Carousel
                        plugins={[
                            Autoplay({
                                delay: 3000,
                            }),
                        ]}
                        className='w-full md:w-1/2 flex'>
                        <CarouselContent className='h-full'>
                            <CarouselItem>
                                <img src="/getStarted.jpg" className='object-cover w-full h-full md:rounded-s-3xl' />
                            </CarouselItem>
                            <CarouselItem>
                                <img src="/02.jpg" className='object-cover w-full h-full md:rounded-s-3xl' />
                            </CarouselItem>
                            <CarouselItem>
                                <img src="/03.gif" className='object-cover w-full h-full md:rounded-s-3xl' />
                            </CarouselItem>
                        </CarouselContent>
                    </Carousel>

                    {/* RIGHT SECTION */}
                    <div className="w-full md:w-1/2 bg-[#7879a7] bg-opacity-80 md:rounded-e-3xl shadow-lg p-8 space-y-6 mt-4 md:mt-0 overflow-auto">
                        <h1 className="text-white font-bold text-2xl mb-4">Let's begin your journey!</h1>

                        <div className="space-y-3">
                            <label className="block text-white text-lg font-semibold">Where do you want to go?</label>
                            <Input
                                placeholder="Enter your destination"
                                className="w-full rounded-lg p-3 text-gray-700"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)} />
                        </div>

                        <div className="space-y-3">
                            <label className="block text-white text-lg font-semibold">For how long?</label>
                            <Input
                                placeholder="e.g., 3 days"
                                type="number"
                                className="w-full rounded-lg p-3 text-gray-700"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="block text-white text-lg font-semibold">Who are you traveling with?</label>
                            <div className="grid sm:grid-cols-3 gap-4">
                                {['Family', 'Friends', 'Solo'].map((option, index) => (
                                    <Card
                                        key={index}
                                        className={`rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 ${companion === option ? 'bg-[#2b253b] text-white' : 'bg-white text-gray-700'}`}
                                        onClick={() => setCompanion(option)}
                                    >
                                        <CardHeader>
                                            <CardTitle>{option}</CardTitle>
                                            <CardDescription>
                                                {option === 'Family' && 'Perfect for family trips.'}
                                                {option === 'Friends' && 'Fun and adventure guaranteed.'}
                                                {option === 'Solo' && 'Your personal escape.'}
                                            </CardDescription>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-white text-lg font-semibold">How much is your budget?</label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {['Budget', 'Moderate', 'Luxury'].map((option, index) => (
                                    <Card
                                        key={index}
                                        className={`rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 ${budget === option ? 'bg-[#2b253b] text-white' : 'bg-white text-gray-700'}`}
                                        onClick={() => setBudget(option)}
                                    >
                                        <CardHeader>
                                            <CardTitle>{option}</CardTitle>
                                            <CardDescription>
                                                {option === 'Budget' && 'Travel economically.'}
                                                {option === 'Moderate' && 'Enjoy balanced luxury.'}
                                                {option === 'Luxury' && 'Indulge in premium experiences.'}
                                            </CardDescription>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>
                            <div className='flex justify-center'>
                                <Button size='md' variant='secondary' className='rounded-full w-full' onClick={handleSubmit}>Create Trip &rarr;</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {data && <TripData trip={data} />}
            {/* <TripData trip={data} /> */}
        </>
    )
}

export default CreateTrip
