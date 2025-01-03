import React, { useEffect, useState } from 'react';

function Preloader() {
    const [percentage, setPercentage] = useState(0);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        const duration = 5000;
        const interval = 50;
        const increment = 100 / (duration / interval);

        const intervalId = setInterval(() => {
            setPercentage(prev => {
                const newPercentage = prev + increment;
                if (newPercentage === 100) {
                    clearInterval(intervalId);
                    setIsFading(true);
                    setTimeout(() => {
                        const landingPage = document.querySelector(".landing-page");
                        if (landingPage) {
                            landingPage.remove();
                        }
                    }, 1500);
                }
                return newPercentage;
            });
        }, interval);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={`landing-page fixed z-50 inset-0 flex items-center justify-center bg-black transition-opacity duration-1000 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
            <div className="counter text-white text-4xl">
                <video className="landing-video w-full h-full object-cover absolute inset-0 animate-out" src="/preloader.mp4" autoPlay muted loop></video>
                <span className="relative text-md z-10 animate-pulse animate">{Math.floor(percentage)}%</span>
            </div>
        </div>
    );
}

export default Preloader;
