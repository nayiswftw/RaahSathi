'use client'
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { AuroraText } from "@/components/ui/aurora-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { SparklesText } from "@/components/ui/sparkles-text";
import { features } from "@/lib/Constants";
import { CompassIcon, DatabaseIcon, HomeIcon, MessageCircleIcon, PlaneTakeoffIcon, ShieldCheckIcon, SparklesIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  {
    name: "Home",
    link: "/",
    icon: <HomeIcon className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: <UserIcon className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Trips",
    link: "/dashboard/trip",
    icon: (
      <MessageCircleIcon className="h-4 w-4 text-neutral-500 dark:text-white" />
    ),
  },
];

export const workflowSteps = [
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

export const testimonials = [
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

const FeatureCard = ({ feature }: any) => (
  <BlurFade inView delay={0.25 + feature.index * 0.1} direction="up">
    <Card className="bg-white rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle><feature.icon className="h-8 w-8 mb-4 text-black" /></CardTitle>
        <CardDescription><h3 className="text-lg md:text-xl font-semibold text-black">{feature.title}</h3></CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{feature.description}</p>
      </CardContent>
    </Card>
  </BlurFade>
);

const TestimonialCard = ({ testimonial, index }: any) => (
  <div className="bg-gray-50 p-6 rounded-2xl">
    <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
    <div className="flex items-center justify-center">
      <img
        src={`https://i.pravatar.cc/300?img=${index + 1}`}
        alt={`Avatar of ${testimonial.name}`}
        className="rounded-full h-16 w-16 mr-4"
      />
      <div>
        <h4 className="font-bold text-black">{testimonial.name}</h4>
        <p className="text-muted-foreground">{testimonial.location}</p>
      </div>
    </div>
  </div>
);

export default function Home() {
  return (
    <>
      <Navbar />
      <FloatingNav navItems={navItems} />
      <section className="min-h-[70vh] w-full py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="container max-w-7xl mx-auto grid lg:grid-cols-2 items-center gap-8 lg:gap-12">
          <div className="space-y-6 text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
          <AuroraText>Revolutionize</AuroraText> Your Travel Experience
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">
          RaahSathi leverages advanced AI to create personalized, intelligent travel experiences that transform how you explore the world.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Link href={'/dashboard/trip'}>
            <Button size="lg" className="w-full sm:w-auto shadow-lg">
          Plan Your Trip
          <SparklesIcon className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            Learn More
          </Button>
        </div>
          </div>
          <div className="bg-gray-100 rounded-2xl p-4 sm:p-6 lg:p-8 mt-8 lg:mt-0 text-center">
        <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center text-black">Why Choose RaahSathi?</h3>
        <div className="space-y-4">
          {[
            { icon: CompassIcon, text: "Personalized Recommendations" },
            { icon: ShieldCheckIcon, text: "Secure & Reliable" },
            { icon: PlaneTakeoffIcon, text: "Seamless Trip Planning" }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
          <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
          <span className="text-sm sm:text-base text-muted-foreground">{item.text}</span>
            </div>
          ))}
        </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-12">
        How RaahSathi Works
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {workflowSteps.map((step, index) => (
          <div key={index} className="text-center">
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md mb-6">
          <step.icon className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-4 text-black" />
          <h3 className="text-lg sm:text-xl font-bold mb-3 text-black">{step.title}</h3>
          <p className="text-sm sm:text-base text-muted-foreground">{step.description}</p>
            </div>
            <div className="h-1 bg-primary/20 w-2/3 mx-auto" />
          </div>
        ))}
          </div>
        </div>
      </section>

      <section className='py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center'>
        <h2 className='text-xl sm:text-2xl lg:text-3xl text-center'>
          Your Ultimate Travel Companion<br />
          <AuroraText>Plan, Explore, and Experience</AuroraText>
        </h2>
      </section>

      <section className='py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center'>
        <div className="container mx-auto space-y-8 sm:space-y-12">
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-center">
        Organize it all <AuroraText>in one place.</AuroraText>
          </h1>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={{ ...feature, index }} />
        ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="container mx-auto space-y-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center">
        What Our Travelers Say
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} index={index} />
        ))}
          </div>
        </div>
      </section>

      <section className='relative min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] flex flex-col items-center justify-center'>
        <Image
          src={'/getStarted.jpg'}
          alt="Get Started Background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="relative flex flex-col items-center justify-center h-full z-10 px-4 py-12">
          <span className='font-semibold text-lg sm:text-xl lg:text-3xl mb-6 text-white'>Ready to explore?</span>
          <Link href='/dashboard'>
        <InteractiveHoverButton>
          Get Started &rarr;
        </InteractiveHoverButton>
          </Link>
        </div>
      </section>

      <section className="relative min-h-[500px] sm:min-h-[600px] lg:min-h-screen flex flex-col items-center justify-center">
        <div className="absolute inset-0">
          <Image
        src={'/landing.avif'}
        alt="Landing Background"
        fill
        priority
        sizes="100vw"
        className="object-cover"
          />
          <Image
        src={'/clouds.avif'}
        alt="Clouds Background"
        fill
        priority
        sizes="100vw"
        className="object-cover relative pt-24"
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <SparklesText text="RaahSathi" className="text-white text-3xl sm:text-4xl lg:text-5xl" />
          <span className="text-lg sm:text-xl font-semibold text-yellow-300 mt-4">From Here to Anywhere</span>
        </div>
      </section>
      <Footer />
    </>
  );
}