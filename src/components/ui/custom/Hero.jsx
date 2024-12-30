import React from 'react'
import { Button } from '../button'
import Footer from './Footer';
import { Link } from 'react-router';

const features = [
  {
    icon: "fa-hotel",
    title: "Hotels",
    text: "Stay at the best hotels around the world for the best prices.",
  },
  {
    icon: "fa-car",
    title: "Car Rental",
    text: "Unlock deals on any type of wheels and hit the road.",
  },
  {
    icon: "fa-plane",
    title: "Flights",
    text: "Get real-time airfares for anywhere you want to jet off to.",
  },
  {
    icon: "fa-cutlery",
    title: "Restaurants",
    text: "Snag a coveted table at the hottest restaurants.",
  },
  {
    icon: "fa-history",
    title: "Experiences",
    text: "Make reservations for your favorite activities, then make memories.",
  },
  {
    icon: "fa-location-arrow",
    title: "Tours",
    text: "Get an insider’s perspective on any location or attraction.",
  },
];

function Hero() {
  return (
    <>
      {/* LANDING PAGE */}
      <section
        id="landing"
        className="relative flex items-center justify-center h-screen bg-black"
      >
        {/* Background Image */}
        <img
          src="/landing.avif"
          alt="Landing Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Cloud Overlay */}
        <img
          src="/clouds.avif"
          alt="Cloud Overlay"
          className="absolute top-20 w-full h-full object-cover opacity-80"
        />

        {/* Text Content */}
        <div className="relative w-full text-center z-10">
          <h1
            id="brand"
            className="text-white text-6xl md:text-8xl font-bold"
          >
            RaahSathi
          </h1>
        </div>
      </section>

      {/* GET STARTED */}
      <section id="getStarted"
        className="relative flex items-center justify-center h-[80vh] bg-black">

        {/* Background Image */}
        <img
          src="/getStarted.jpg"
          alt="Get Started"
          className="absolute top-0 w-full h-full object-cover opacity-80"
        />

        {/* Text Content */}
        <div className="relative w-full text-center z-10">
          <span
          className='text-white text-2xl md:text-4xl font-semibold'
          >
            Ready to explore?
          </span>
          <h1
            id="brand"
            className="text-white text-6xl md:text-8xl font-bold"
          >
            <Link to="/create-trip">
              <Button
                size="lg"
                className="rounded-full bg-transparent border-2 border-white text-white hover:border-none"
                variant="ghost"
              >Get Started</Button>
            </Link>
          </h1>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section
        id="features-card"
        className="flex flex-col items-center justify-center py-10"
      >
        {/* Section Title */}
        <div className="text-center p-5">
          <h1 className="text-3xl md:text-5xl font-bold">
            Organize it all in one place.
          </h1>
        </div>

        {/* Features Grid */}
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <div key={index} className="card bg-white shadow-lg rounded-lg h-full">
              <div className="card-body p-5">
                <div className="card-title text-xl font-semibold text-center mb-4">
                  <i className={`fa ${feature.icon} text-3xl mb-2`} />
                  <br />
                  {feature.title}
                </div>
                <div className="card-text text-center text-gray-600">
                  {feature.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TODO: CAROUSEL */}

      {/* FOOTER */}
      <Footer />
    </>
  )
}

export default Hero