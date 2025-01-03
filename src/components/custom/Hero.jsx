import { Button } from '../ui/button'
import { Link } from 'react-router';
import { features } from '../../lib/Constants';
// import Preloader from './Preloader';

function Hero() {
    return (
        <>  
            {/* <Preloader/> */}
            <section className='relative flex items-center justify-center min-h-[600px] h-screen bg-black'>
                <div className="absolute inset-0 overflow-hidden">
                    <img src="/landing.avif" className='absolute object-cover w-full h-full transition-transform duration-[20s] hover:scale-110' alt="Landing" />
                    <img src='/clouds.avif' className='absolute object-cover w-full h-full top-10 sm:top-20 animate-float' alt="Clouds" />
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
                </div>
                <h1 className='absolute text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center px-4 z-10 animate-fade-in'>
                    RaahSathi
                    <span className="block text-lg sm:text-xl md:text-2xl mt-4 font-normal opacity-50">From Here to Anywhere</span>
                </h1>
            </section>

            <section className='relative flex items-center justify-center min-h-[500px] h-[80vh] bg-black'>
                <img src="/getStarted.jpg" className='absolute object-cover w-full h-full transition-transform duration-500 hover:scale-105' alt="Get Started" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="relative w-full text-center z-10 px-4 animate-slide-up">
                    <span className='font-semibold text-xl sm:text-2xl md:text-3xl text-white block mb-6'>Ready to explore?</span>
                    <Link to='/auth'>
                        <Button
                            size='lg'
                            variant='outline'
                            className='rounded-full text-white bg-transparent hover:text-black transition-all duration-300 text-sm sm:text-base'
                        >
                            Get Started &rarr;
                        </Button>
                    </Link>
                </div>
            </section>

            <section className='relative flex items-center justify-center min-h-[400px] bg-black overflow-hidden'>
                <img src="/tagline.jpg" className='absolute object-cover w-full h-full opacity-70 scale-110 hover:scale-100 transition-transform duration-75' alt="Tagline Background" />
                <div className="absolute inset-0 bg-black/40"></div>
                <h2 className='relative text-2xl sm:text-3xl md:text-4xl text-white text-center px-4 font-light leading-relaxed z-10 animate-fade-in'>
                    Your Ultimate Travel Companion<br />
                    <span className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Plan, Explore, and Experience</span>
                </h2>
            </section>

            <section className='relative flex flex-col items-center justify-center min-h-screen overflow-hidden py-16'>
                <div className="absolute inset-0 z-0">
                    <img
                        src="/features.gif"
                        className='w-full h-full object-cover object-center scale-105'
                        alt="Background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 backdrop-blur-[2px]"></div>
                </div>

                <div className="relative mb-16 z-10 px-4">
                    <h3 className='text-white text-center text-3xl sm:text-4xl md:text-5xl font-bold leading-tight animate-fade-in'>
                        Organize it all <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">in one place.</span>
                    </h3>
                </div>

                <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 p-4 sm:p-6 w-full max-w-7xl z-10">
                    {features.map((item, index) => (
                        <div
                            key={index}
                            className="group card backdrop-blur-md bg-white/90 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-br hover:from-white hover:to-blue-50 animate-fade-in"
                            style={{ animationDelay: `${index * 200}ms` }}
                        >
                            <div className="card-body p-6 sm:p-8 space-y-4">
                                <h4 className="card-title text-xl sm:text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                    {item.title}
                                </h4>
                                <p className="card-text text-base sm:text-lg text-gray-600">
                                    {item.text}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default Hero