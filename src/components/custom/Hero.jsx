import { Button } from '../ui/button'
import { Link } from 'react-router';
import { features } from '../../lib/Constants';


function Hero() {
    return (
        <>
            <section className='relative flex items-center justify-center h-screen bg-black'>
                <img src="/landing.avif" className='absolute object-cover w-full h-full' alt="Landing" />
                <img src='/clouds.avif' className='absolute object-cover w-full h-full top-20' alt="Clouds" />
                <h1 className='absolute text-7xl font-bold text-white'>RaahSathi</h1>
            </section>

            <section className='relative flex items-center justify-center h-[80vh] bg-black'>
                <img src="/getStarted.jpg" className='absolute object-cover w-full h-full' alt="Get Started" />
                <div className="relative w-full text-center z-10">
                    <span className='font-bold text-3xl text-white'>Ready to explore?</span>
                    <h1>
                        <Link to='/auth'>
                            <Button size='lg' className='rounded-full bg-transparent text-white' variant='outline'>Get Started &rarr;</Button>
                        </Link>
                    </h1>
                </div>
            </section>

            <section className='relative flex flex-col items-center justify-center h-screen bg-slate-500'>
                <div>
                    <h3 className='text-white text-center text-4xl mb-8'>Organize it all in one place.</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-5">
                    {features.map((item, index) => (
                        <div
                            key={index}
                            className="card bg-white shadow-lg rounded-xl overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
                        >
                            <div className="card-body p-6 space-y-4">
                                <h4 className="card-title text-2xl font-semibold text-gray-800">{item.title}</h4>
                                <p className="card-text text-gray-600">{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </section>
        </>
    )
}

export default Hero