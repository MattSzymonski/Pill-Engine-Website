import { Github } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        Product: [
            { label: 'Guide', href: 'https://docs.pill.rocks' },
            { label: 'Examples', href: 'https://github.com/MattSzymonski/Pill-Engine/tree/main/examples' },
            { label: 'GitHub', href: 'https://github.com/MattSzymonski/Pill-Engine' },
        ],
        Community: [
            { label: 'GitHub', href: 'https://github.com/MattSzymonski/Pill-Engine' },
            { label: 'Contributing', href: 'https://docs.pill.rocks/guide/contributing/contributing.html' },
        ],
    };

    return (
        <footer className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-x-8 mb-16">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <a href="/" className="flex items-center">
                            <img
                                src="/pill_logo.svg"
                                alt="Pill Engine"
                                className="size-20"
                            />
                        </a>
                        <p className="text-lg text-gray-500 mb-4 max-w-xs leading-relaxed">
                            Modern, free and blazingly fast game engine. Building the future of game development.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-8 mb-16">
                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="text-lg font-semibold text-white mb-4">
                                {category}
                            </h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className="text-md text-gray-500 hover:text-gray-300 transition-colors duration-200"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Newsletter / Subscribe */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">
                            Stay updated
                        </h4>
                        <p className="text-md text-gray-500 mb-3 leading-relaxed">
                            Get product updates and news. No spam.
                        </p>
                        <a
                            href="https://github.com/MattSzymonski/Pill-Engine"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-white/[0.05] border border-white/[0.08] rounded-lg hover:bg-white/[0.08] transition-all duration-200"
                        >
                            <Github className="w-4 h-4" />
                            Star on GitHub
                        </a>
                        </div>
                        </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-lg text-gray-500">
                        &copy; {currentYear} Pill. Fueled by passion.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
