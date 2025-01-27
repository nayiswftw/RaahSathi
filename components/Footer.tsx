import React from 'react'
import { Button } from './ui/button'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

function Footer() {
    return (
        <footer className=" py-8 mt-auto">
            <div className="container max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0 text-center md:text-left">
                        <h3 className="text-lg font-bold ">RaahSathi</h3>
                        <p className="text-sm ">Made with ❤️ by TeamSpace</p>
                    </div>
                    <div className="flex gap-6 text-sm text-gray-500 justify-center md:justify-end">
                        <Link href={"https://github.com/nayiswftw/raahsathi"} target='_blank'>
                            <Button>
                                Github <ArrowUpRight className="h-4 w-4 ml-1" />
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="text-center mt-6 text-xs text-gray-400">
                    © {new Date().getFullYear()} RaahSathi. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer
