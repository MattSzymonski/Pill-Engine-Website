import React from 'react';
import { Github } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-gray-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Brand */}
                    <div className="flex-shrink-0">
                        <a href="/" className="text-2xl font-bold text-white hover:text-pill-red transition-colors duration-300" style={{ fontFamily: '"Chillax Variable", sans-serif' }}>
                            pill
                        </a>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-8">
                        <a
                            href="/guide/"
                            className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
                        >
                            Guide
                        </a>
                        <a
                            href="/guide/getting-started/setup"
                            className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
                        >
                            Examples
                        </a>
                        <a
                            href="https://github.com/pill-engine"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-pill-red transition-colors duration-300"
                        >
                            <Github className="w-6 h-6" />
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
