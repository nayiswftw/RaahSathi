import React from 'react'

function Footer() {
    return (
        <footer className="text-black py-5 border-t border-gray-900">
            <nav className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="navbar-brand">
                    <img
                        src="/logo.svg"
                        alt="RaahSathi Logo"
                        className="h-10 w-auto"
                    />
                </div>

                {/* Copyright Section */}
                <div className="navbar-text text-center flex flex-col items-center">
                    <span>Copyright &copy; RaahSathi 2023</span>
                    <span>All rights reserved.</span>
                </div>

                {/* Social Links */}
                <ul className="navbar-nav flex space-x-5">
                    <li className="flex items-center space-x-2">
                        <i className="fa fa-github text-xl" aria-hidden="true"></i>
                        <span>GitHub</span>
                    </li>
                    <li className="flex items-center space-x-2">
                        <i className="fa fa-linkedin text-xl" aria-hidden="true"></i>
                        <span>LinkedIn</span>
                    </li>
                </ul>
            </nav>
        </footer>
    )
}

export default Footer