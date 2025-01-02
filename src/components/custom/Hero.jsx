import { Button } from '../ui/button'
import { Link } from 'react-router';
import { features } from '../../lib/Constants';

function Hero() {
    return (
        <>
            <section className='relative flex items-center justify-center min-h-[600px] h-screen bg-black'>
                <img src="/landing.avif" className='absolute object-cover w-full h-full' alt="Landing" />
                <img src='/clouds.avif' className='absolute object-cover w-full h-full top-10 sm:top-20' alt="Clouds" />
                <h1 className='absolute text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center px-4'>RaahSathi</h1>
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

            <section className='relative flex flex-col items-center justify-center min-h-[800px] h-auto py-12 sm:py-16 bg-slate-500'>
                <div className="px-4 mb-8">
                    <h3 className='text-white text-center text-2xl sm:text-3xl md:text-4xl'>Organize it all in one place.</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-5 w-full max-w-7xl">
                    {features.map((item, index) => (
                        <div
                            key={index}
                            className="card bg-white shadow-lg rounded-xl overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
                        >
                            <div className="card-body p-4 sm:p-6 space-y-3 sm:space-y-4">
                                <h4 className="card-title text-xl sm:text-2xl font-semibold text-gray-800">{item.title}</h4>
                                <p className="card-text text-sm sm:text-base text-gray-600">{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default Hero