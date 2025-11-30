import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggler = () => {
    const [theme, setTheme] = useState('dark');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Check localStorage and system preference
        const savedTheme = localStorage.getItem('theme');
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const initialTheme = savedTheme || systemTheme;
        setTheme(initialTheme);
        document.documentElement.classList.toggle('dark', initialTheme === 'dark');
    }, []);

    const toggleTheme = async () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';

        // Use View Transitions API if available
        if (document.startViewTransition) {
            await document.startViewTransition(() => {
                setTheme(newTheme);
                document.documentElement.classList.toggle('dark', newTheme === 'dark');
                localStorage.setItem('theme', newTheme);
            }).ready;

            // Animate the transition
            document.documentElement.animate(
                {
                    clipPath: [
                        'circle(0% at 50% 50%)',
                        'circle(150% at 50% 50%)'
                    ]
                },
                {
                    duration: 700,
                    easing: 'ease-in-out',
                    pseudoElement: '::view-transition-new(root)'
                }
            );
        } else {
            setTheme(newTheme);
            document.documentElement.classList.toggle('dark', newTheme === 'dark');
            localStorage.setItem('theme', newTheme);
        }
    };

    if (!mounted) return null;

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-6 right-6 z-50 p-3 glass rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-110 group"
            aria-label="Toggle theme"
        >
            <div className="relative w-6 h-6">
                <Sun
                    className={`absolute inset-0 w-6 h-6 transition-all duration-500 ${theme === 'light'
                        ? 'rotate-0 scale-100 opacity-100'
                        : 'rotate-90 scale-0 opacity-0'
                        }`}
                />
                <Moon
                    className={`absolute inset-0 w-6 h-6 transition-all duration-500 ${theme === 'dark'
                        ? 'rotate-0 scale-100 opacity-100'
                        : '-rotate-90 scale-0 opacity-0'
                        }`}
                />
            </div>
        </button>
    );
};

export default ThemeToggler;
