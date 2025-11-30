import React from 'react';
import { Github, Twitter, MessageCircle } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <h3 className="text-3xl font-bold mb-4 text-pill-red">
                            Pill Engine
                        </h3>
                        <p className="text-gray-300 mb-6 max-w-md">
                            A blazing fast, data-driven game engine written in Rust. Building the future of game development.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://github.com/pill-engine" target="_blank" rel="noopener noreferrer"
                                className="text-gray-300 hover:text-pill-red transition-colors duration-300">
                                <Github className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-pill-red-light-light transition-colors duration-300">
                                <Twitter className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-rust-orange transition-colors duration-300">
                                <MessageCircle className="w-6 h-6" />
                            </a>
                        </div>
                    </div>

                    {/* Resources */}
                    <div className="flex flex-col items-start md:items-center">
                        <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Resources</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-pill-red transition-colors duration-300">
                                    Guide
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-pill-red transition-colors duration-300">
                                    Examples
                                </a>
                            </li>
                            {/* <li>
                                <a href="#" className="text-gray-300 hover:text-pill-red transition-colors duration-300">
                                    API Reference
                                </a>
                            </li> */}
                            {/* <li>
                                <a href="#" className="text-gray-300 hover:text-pill-red transition-colors duration-300">
                                    Tutorials
                                </a>
                            </li> */}
                        </ul>
                    </div>

                    {/* Community */}
                    <div className="flex flex-col items-start md:items-end">
                        <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Community</h4>
                        <ul className="space-y-3 text-left md:text-right">
                            <li>
                                <a href="https://github.com/pill-engine" target="_blank" rel="noopener noreferrer"
                                    className="text-gray-300 hover:text-pill-red transition-colors duration-300">
                                    GitHub
                                </a>
                            </li>
                            {/* <li>
                                <a href="#" className="text-gray-300 hover:text-pill-red transition-colors duration-300">
                                    Discord
                                </a>
                            </li> */}
                            <li>
                                <a href="#" className="text-gray-300 hover:text-pill-red transition-colors duration-300">
                                    Contributing
                                </a>
                            </li>
                            {/* <li>
                                <a href="#" className="text-gray-300 hover:text-pill-red transition-colors duration-300">
                                    Showcase
                                </a>
                            </li> */}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-300 text-sm">
                            © {currentYear} Pill Engine. Fueled by passion.
                        </p>

                    </div>
                </div>
            </div>

            {/* Decorative line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pill-red to-transparent opacity-50"></div>
        </footer>
    );
};

export default Footer;
