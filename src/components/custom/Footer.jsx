
const Footer = () => (
    <footer className='text-center p-5 flex justify-between items-center'>
        <div className='inline-flex space-x-2 items-center'>
            <img
                src="/logo.svg"
                alt="RaahSathi Logo"
                className="h-10 w-auto"
            />
            <span className='text-xl'>RaahSathi</span>
        </div>
        <p className='text-gray-500'>&copy; 2025 RaahSathi. All rights reserved.</p>
        <ul className='flex justify-center space-x-4'>
            <li><a href="https://github.com/nayiswftw/RaahSathi" target="_blank" rel="noopener noreferrer">Github</a></li>
            <li><a href="https://linkedin.com/nayisw" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        </ul>
    </footer>
);

export default Footer;
