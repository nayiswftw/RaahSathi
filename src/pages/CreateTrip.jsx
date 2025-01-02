import { useState, useEffect, memo } from 'react'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Autoplay from "embla-carousel-autoplay"
import { Input } from '@/components/ui/input'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import TripData from './TripData'
import { chatSession } from '@/lib/Gemini'
import { AI_PROMPT } from '@/lib/Constants'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebaseConfig'
import { Link } from 'react-router'
import { Loader2 } from 'lucide-react'

const SelectionCard = memo(({ option, type, value, onClick, description }) => (
    <Card
        className={`rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105 
      ${value === option ? 'bg-[#2b253b] text-white' : 'bg-white text-gray-700'}`}
        onClick={() => onClick(option)}
    >
        <CardHeader>
            <CardTitle className="text-base md:text-lg">{option}</CardTitle>
            <CardDescription className="text-sm">{description}</CardDescription>
        </CardHeader>
    </Card>
));

const ImageCarousel = memo(() => (
    <Carousel plugins={[Autoplay({ delay: 3000 })]} className='w-full md:w-1/2 flex'>
        <CarouselContent className='h-full'>
            {['/getStarted.jpg', '/02.jpg', '/03.gif'].map((src, i) => (
                <CarouselItem key={i}>
                    <img src={src} className='object-cover w-full h-full md:rounded-s-3xl' />
                </CarouselItem>
            ))}
        </CarouselContent>
    </Carousel>
));

function CreateTrip() {
    const [formData, setFormData] = useState({
        destination: '',
        duration: '',
        companion: '',
        budget: ''
    });
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTripData = async () => {
            try {
                const docSnap = await getDoc(doc(db, 'TripData', auth.currentUser.uid));
                if (docSnap.exists()) setData(docSnap.data());
            } catch (error) {
                console.error("Error fetching trip:", error);
            }
        };
        fetchTripData();
    }, []);

    const handleInputChange = (field) => (e) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = async () => {
        if (Object.values(formData).some(v => !v)) {
            toast({
                title: "Please complete all fields before proceeding!",
                variant: 'destructive',
            });
            return;
        }

        try {
            setLoading(true);

            const FINAL_PROMPT = AI_PROMPT
                .replace('{destination}', formData.destination)
                .replace('{days}', formData.duration)
                .replace('{companions}', formData.companion)
                .replace('{budget}', formData.budget);

            const result = await chatSession.sendMessage(FINAL_PROMPT);
            const docId = auth.currentUser.uid;
            const newData = {
                config: formData,
                data: JSON.parse(result.response.text()),
                id: docId
            };

            await setDoc(doc(db, "TripData", docId), newData);
            setData(newData);
        } catch (error) {
            console.error("Error creating trip:", error);
            toast({
                title: "Error creating trip. Please try again.",
                variant: 'destructive',
            });
        }
        setLoading(false);
    };

    return (
        <>
            <div className='relative min-h-screen overflow-hidden'>
                <video className='absolute object-cover w-full h-full' src="/preloader.mp4" muted autoPlay loop />
                <div className='flex flex-col md:flex-row min-h-screen p-2 md:p-5 relative z-10'>
                    <Link to='/'>
                        <Button size='lg' className='fixed rounded-full bg-transparent text-white z-20 m-2 md:m-5' variant='ghost'>
                            &#8592; Go back
                        </Button>
                    </Link>

                    <ImageCarousel />

                    <div className="w-full md:w-1/2 bg-[#7879a7]/80 md:rounded-e-3xl shadow-lg p-4 md:p-8 space-y-4 md:space-y-6 mt-4 md:mt-0 overflow-auto">
                        <h1 className="text-white font-bold text-xl md:text-2xl">Let's begin your journey!</h1>

                        {[
                            { label: 'Where do you want to go?', field: 'destination', type: 'text', placeholder: 'Enter your destination' },
                            { label: 'For how long?', field: 'duration', type: 'number', placeholder: 'e.g., 3 days' }
                        ].map(({ label, field, type, placeholder }) => (
                            <div key={field} className="space-y-2 md:space-y-3">
                                <label className="block text-white text-base md:text-lg font-semibold">{label}</label>
                                <Input
                                    type={type}
                                    placeholder={placeholder}
                                    className="w-full rounded-lg p-2 md:p-3 text-gray-700"
                                    value={formData[field]}
                                    onChange={handleInputChange(field)}
                                />
                            </div>
                        ))}

                        <div className="space-y-2 md:space-y-3">
                            <label className="block text-white text-base md:text-lg font-semibold">Who are you traveling with?</label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-4">
                                {[
                                    ['Family', 'Perfect for family trips.'],
                                    ['Friends', 'Fun and adventure guaranteed.'],
                                    ['Solo', 'Your personal escape.']
                                ].map(([option, desc]) => (
                                    <SelectionCard
                                        key={option}
                                        option={option}
                                        value={formData.companion}
                                        onClick={(val) => setFormData(prev => ({ ...prev, companion: val }))}
                                        description={desc}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2 md:space-y-3">
                            <label className="block text-white text-base md:text-lg font-semibold">How much is your budget?</label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-4">
                                {[
                                    ['Budget', 'Travel economically.'],
                                    ['Moderate', 'Enjoy balanced luxury.'],
                                    ['Luxury', 'Indulge in premium experiences.']
                                ].map(([option, desc]) => (
                                    <SelectionCard
                                        key={option}
                                        option={option}
                                        value={formData.budget}
                                        onClick={(val) => setFormData(prev => ({ ...prev, budget: val }))}
                                        description={desc}
                                    />
                                ))}
                            </div>
                            <div className='flex justify-center mt-4'>
                                <Button
                                    size='md'
                                    variant='secondary'
                                    className='rounded-full w-full text-sm md:text-base'
                                    onClick={handleSubmit}
                                >
                                    {loading ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <>Create Trip &rarr;</>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {data && <TripData trip={data} />}
        </>
    )
}

export default CreateTrip