import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { AuroraText } from "@/components/ui/aurora-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SignedOut } from "@clerk/clerk-react";
import { MapPinIcon, HotelIcon, UtensilsIcon, CarIcon, CalculatorIcon, FileTextIcon, SparklesIcon, ShieldCheckIcon, CompassIcon, PlaneTakeoffIcon, DatabaseIcon, MessageCircleIcon } from "lucide-react";
import { Link } from "react-router";


export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b transition-colors">
            
            <Navbar />

            <section className="pt-36 pb-24 px-6 relative">
                <div className="container max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12">
                    <div>
                        <h1 className="text-5xl font-bold mb-6 leading-tight">
                            <AuroraText>Revolutionize</AuroraText> Your Travel Experience
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            RaahSathi leverages advanced AI to create personalized, intelligent travel experiences that transform how you explore the world.
                        </p>
                        <div className="flex space-x-4 mb-8">
                            <Link to={'/'}>
                                <Button size="lg" className="shadow-lg">
                                    Plan Your Trip
                                    <SparklesIcon className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Button size="lg" variant="outline">
                                Learn More
                            </Button>
                        </div>
                    </div>
                    <div className="bg-gray-100 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold mb-6 text-center text-black">Why Choose RaahSathi?</h3>
                        <div className="space-y-4">
                            {[
                                { icon: CompassIcon, text: "Personalized Recommendations" },
                                { icon: ShieldCheckIcon, text: "Secure & Reliable" },
                                { icon: PlaneTakeoffIcon, text: "Seamless Trip Planning" }
                            ].map((item, index) => (
                                <div key={index} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
                                    <item.icon className="h-6 w-6 text-black" />
                                    <span className="text-muted-foreground">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Everything You Need for Perfect Travel Planning
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <BlurFade key={index} inView delay={0.5 + index * 0.05} direction="up">
                                <Card className="bg-white rounded-2xl shadow-md">
                                    <CardHeader>
                                        <CardTitle><feature.icon className="h-8 w-8 mb-4 text-black" /></CardTitle>
                                        <CardDescription><h3 className="text-xl font-semibold text-black">{feature.title}</h3></CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            </BlurFade>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="container max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-16">
                        How RaahSathi Works
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {workflowSteps.map((step, index) => (
                            <div key={index} className="text-center">
                                <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
                                    <step.icon className="h-12 w-12 mx-auto mb-4 text-black" />
                                    <h3 className="text-xl font-bold mb-3 text-black">{step.title}</h3>
                                    <p className="text-muted-foreground">{step.description}</p>
                                </div>
                                <div className="h-1 bg-primary/20 w-2/3 mx-auto" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="container max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold mb-16">
                        What Our Travelers Say
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-gray-50 p-6 rounded-2xl">
                                <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                                <div className="flex items-center justify-center">
                                    <img
                                        src={`https://i.pravatar.cc/300?img=${index + 1}`}
                                        className="rounded-full h-16 w-16 mr-4"
                                    />
                                    <div>
                                        <h4 className="font-bold text-black">{testimonial.name}</h4>
                                        <p className="text-muted-foreground">{testimonial.location}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="container max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold mb-6">
                        Start Your Next Adventure Today
                    </h2>
                    <p className="text-xl mb-8 max-w-3xl mx-auto">
                        Join thousands of travelers who have transformed their trip planning with RaahSathi's intelligent travel companion.
                    </p>
                    <div className="space-x-4">
                        <SignedOut>
                            <Link to={'/auth'}>
                                <Button size="lg" variant="secondary">
                                    Create Free Account
                                </Button>
                            </Link>
                        </SignedOut>
                        <Button size="lg">
                            Get Started
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

const features = [
    {
        title: "Smart Destination Guide",
        description: "AI-powered recommendations for tourist spots tailored to your interests",
        icon: MapPinIcon,
    },
    {
        title: "Hotel Finder",
        description: "Find and book the perfect accommodation within your budget",
        icon: HotelIcon,
    },
    {
        title: "Restaurant Discovery",
        description: "Explore local cuisine and find top-rated restaurants",
        icon: UtensilsIcon,
    },
    {
        title: "Transportation Planning",
        description: "Seamless transportation options and booking",
        icon: CarIcon,
    },
    {
        title: "Budget Overview",
        description: "Keep track of your expenses and plan within your budget",
        icon: CalculatorIcon,
    },
    {
        title: "Trip Export",
        description: "Download your entire itinerary as a PDF",
        icon: FileTextIcon,
    },
];

const workflowSteps = [
    {
        title: "Tell Us Your Preferences",
        description: "Share your travel interests, budget, and trip details.",
        icon: MessageCircleIcon,
    },
    {
        title: "AI-Powered Recommendations",
        description: "Our intelligent system generates personalized suggestions.",
        icon: DatabaseIcon,
    },
    {
        title: "Customize and Book",
        description: "Refine your plan and book with confidence.",
        icon: SparklesIcon,
    }
];

const testimonials = [
    {
        name: "Sarah Johnson",
        location: "New York, USA",
        quote: "RaahSathi transformed my travel planning. The AI recommendations are spot on!",
    },
    {
        name: "Miguel Rodriguez",
        location: "Barcelona, Spain",
        quote: "Incredible tool that understands my travel style perfectly.",
    },
    {
        name: "Emma Thompson",
        location: "London, UK",
        quote: "Never thought AI could make trip planning this easy and fun.",
    }
];
