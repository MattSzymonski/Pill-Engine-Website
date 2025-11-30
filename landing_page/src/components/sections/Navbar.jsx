import React, { useState, useEffect } from 'react';
import { Github } from 'lucide-react';

const Navbar = () => {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        // Check initial theme
        const isDark = document.documentElement.classList.contains('dark');
        setTheme(isDark ? 'dark' : 'light');
    }, []);

    const toggleTheme = (e) => {
        e.preventDefault(); // Prevent navigation
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);

        // Support View Transitions API for smooth theme change
        if (!document.startViewTransition) {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', newTheme);
            return;
        }

        document.startViewTransition(() => {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', newTheme);
        });
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-gray-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Brand - Clickable theme toggle */}
                    <div className="flex-shrink-0">
                        <span
                            onClick={toggleTheme}
                            className="text-2xl font-bold text-white hover:text-pill-primary cursor-pointer transition-all duration-300 hover:scale-105 inline-block select-none"
                            style={{ fontFamily: '"Chillax Variable", sans-serif' }}
                            title="Click to toggle theme"
                        >
                            pill
                        </span>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-8">
                        <a
                            href="/guide"
                            className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
                        >
                            Guide
                        </a>
                        <a
                            href="https://github.com/MattSzymonski/Pill-Engine/tree/main/examples"
                            className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
                        >
                            Examples
                        </a>
                        <a
                            href="https://github.com/MattSzymonski/Pill-Engine"
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
