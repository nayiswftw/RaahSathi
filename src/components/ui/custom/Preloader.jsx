import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

function Preloader() {
  const [progress, setProgress] = useState(0);
  const preloaderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);

          // Use GSAP to fade out the preloader
          gsap.to(preloaderRef.current, {
            opacity: 0,
            duration: 1, // Duration of the fade-out
            onComplete: () => {
              setProgress(0); // Reset progress for reusability
            },
          });

          return 100;
        }
        return prevProgress + 1;
      });
    }, 50); // Adjust the interval time as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={preloaderRef}
      className="relative w-full h-screen flex flex-col items-center justify-center bg-black"
    >
      {/* Background video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
      >
        <source src="/preloader.mp4" type="video/mp4" />
      </video>

      {/* Text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40">
        <div className="text-white text-4xl font-bold mb-4">
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}

export default Preloader;
