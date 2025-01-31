import { AuroraText } from './components/ui/aurora-text'
import { CalculatorIcon, CarIcon, CompassIcon, DatabaseIcon, FileTextIcon, HomeIcon, HotelIcon, MapPinIcon, MessageCircle, MessageCircleIcon, PlaneTakeoffIcon, ShieldCheckIcon, SparklesIcon, User2Icon, UtensilsIcon } from 'lucide-react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { InteractiveHoverButton } from './components/ui/interactive-hover-button'
import { SparklesText } from './components/ui/sparkles-text'
import Navbar from './components/Navbar'
import { FloatingNav } from './components/ui/floating-navbar'
import Footer from './components/Footer'
import { Link } from 'react-router'

export default function App() {
  return (
    <>
      <Navbar />
      <FloatingNav navItems={navItems} />

      <section className="min-h-[70vh] w-full py-12 md:py-20 px-4 sm:px-8">
        <div className="container max-w-7xl mx-auto grid lg:grid-cols-2 items-center gap-8 lg:gap-16">
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight dark:text-white">
              <AuroraText>Revolutionize</AuroraText> Your Travel Experience
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              RaahSathi leverages advanced AI to create personalized, intelligent travel experiences that transform how you explore the world.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to={'/dashboard/trip'}> 
              <Button size="lg" className="shadow-md hover:shadow-lg transition-all">
                Plan Your Trip<SparklesIcon className="ml-2 h-4 w-4" />
              </Button>
              </Link>
            </div>
          </div>
          <div className="rounded-2xl bg-white/60 dark:bg-black backdrop-blur p-8 shadow-xl hover:shadow-2xl transition-all border dark:border-gray-800">
            <h3 className="text-xl md:text-2xl font-bold mb-8 text-gray-900 dark:text-white">Why Choose RaahSathi?</h3>
            <div className="grid gap-6">
              {[
                { icon: CompassIcon, text: "Personalized Recommendations" },
                { icon: ShieldCheckIcon, text: "Secure & Reliable" },
                { icon: PlaneTakeoffIcon, text: "Seamless Trip Planning" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group hover:translate-x-2 transition-transform">
                  <item.icon className="h-6 w-6 text-primary dark:text-primary" />
                  <span className="text-base md:text-lg font-medium text-gray-700 dark:text-gray-200">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4 sm:px-8" id='how-it-works'>
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-12 dark:text-white">
            How RaahSathi Works
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {workflowSteps.map((step, i) => (
              <div key={i} className="text-center hover:-translate-y-2 transition-transform">
                <div className="bg-white dark:bg-black p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                  <step.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-lg md:text-xl font-bold mb-3 dark:text-white">{step.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground dark:text-gray-300">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <h2 className="text-xl sm:text-2xl lg:text-3xl text-center dark:text-white">
          Your Ultimate Travel Companion<br />
          <AuroraText>Plan, Explore, and Experience</AuroraText>
        </h2>
      </section>

      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto space-y-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center dark:text-white">
            Organize it all <AuroraText>in one place.</AuroraText>
          </h1>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <Card key={i} className="bg-white dark:bg-black rounded-xl shadow hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle><feature.icon className="h-6 w-6 mb-3 text-black dark:text-white" /></CardTitle>
                  <CardDescription><h3 className="text-base md:text-lg font-semibold text-black dark:text-white">{feature.title}</h3></CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm md:text-base text-muted-foreground dark:text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative min-h-[400px] sm:h-[500px] flex items-center justify-center">
        <img
          src="/getStarted.jpg"
          alt="Get Started"
          className="absolute inset-0 w-full h-full object-cover dark:brightness-75"
        />
        <div className="relative z-10 text-center px-4 flex flex-col">
          <span className="font-semibold text-lg sm:text-xl lg:text-2xl mb-6 text-white">Ready to explore?</span>
          <InteractiveHoverButton>
            <Link to="/dashboard">
              Get Started &rarr;
            </Link>
          </InteractiveHoverButton>
        </div>
      </section>

      <section className="relative min-h-[500px] sm:h-[600px] lg:h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="/landing.avif"
            alt="Landing"
            className="absolute inset-0 w-full h-full object-cover dark:brightness-75"
          />
          <img
            src="/clouds.avif"
            alt="Clouds"
            className="absolute inset-0 w-full h-full object-cover pt-24 dark:brightness-75"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <SparklesText text="RaahSathi" className="dark:text-white text-white sm:text-3xl lg:text-4xl" />
          <span className="block text-base sm:text-lg font-semibold text-yellow-300 mt-4">From Here to Anywhere</span>
        </div>
      </section>

      <Footer />
    </>
  )
}


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
const navItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Explore",
    link: "/dashboard/explore",
  },
  {
    name: "Dashboard",
    link: "/dashboard",
  },
]