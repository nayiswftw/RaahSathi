import React from 'react';

const Footer = () => (
    <footer className='p-4 md:p-5'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0'>
            <div className='flex items-center space-x-2'>
                <img
                    src="/logo.svg"
                    alt="RaahSathi"
                    className="h-8 md:h-10 w-auto"
                    loading="lazy"
                />
                <span className='text-lg md:text-xl'>RaahSathi</span>
            </div>
            
            <p className='text-gray-500 text-sm md:text-base order-3 md:order-2'>
                &copy; {new Date().getFullYear()} RaahSathi. All rights reserved.
            </p>
            
            <ul className='flex space-x-4 order-2 md:order-3'>
                {[
                    ['Github', 'https://github.com/nayiswftw/RaahSathi'],
                    ['LinkedIn', 'https://linkedin.com/nayisw']
                ].map(([label, href]) => (
                    <li key={label}>
                        <a 
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-gray-600 transition-colors text-sm md:text-base"
                        >
                            {label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    </footer>
);

export default Footer;