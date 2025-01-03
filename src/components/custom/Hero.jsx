import { Button } from '../ui/button'
import { Link } from 'react-router';
import { features } from '../../lib/Constants';

function Hero() {
    return (
        <>
            <section className='relative flex items-center justify-center min-h-[600px] h-screen bg-black'>
                <img src="/landing.avif" className='absolute object-cover w-full h-full' alt="Landing" />
                <img src='/clouds.avif' className='absolute object-cover w-full h-full top-10 sm:top-20' alt="Clouds" />
                <h1 className='absolute text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center px-4 z-10'>RaahSathi</h1>
            </section>

            <section className='relative flex items-center justify-center min-h-[500px] h-[80vh] bg-black'>
                <img src="/getStarted.jpg" className='absolute object-cover w-full h-full' alt="Get Started" />
                <div className="relative w-full text-center z-10 px-4">
                    <span className='font-bold text-xl sm:text-2xl md:text-3xl text-white block mb-4'>Ready to explore?</span>
                    <Link to='/auth'>
                        <Button
                            size='lg'
                            className='rounded-full bg-transparent text-white hover:bg-white/10 text-sm sm:text-base'
                            variant='outline'
                        >
                            Get Started &rarr;
                        </Button>
                    </Link>
                </div>
            </section>

            <section className='relative flex flex-col items-center justify-center min-h-screen overflow-hidden'>
                <div className="absolute inset-0 z-0">
                    <img
                        src="/features.gif"
                        className='w-full h-full object-cover object-center'
                        alt="Background"
                    />
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
                </div>

                <div className="relative mb-12 z-10 px-4">
                    <h3 className='text-white text-center text-3xl sm:text-4xl md:text-5xl font-bold leading-tight animate-fade-in'>
                        Organize it all <span className="text-blue-400">in one place.</span>
                    </h3>
                </div>

                <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 p-4 sm:p-6 w-full max-w-7xl z-10">
                    {features.map((item, index) => (
                        <div
                            key={index}
                            className="group card backdrop-blur-md bg-white/90 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-br hover:from-white hover:to-blue-50"
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