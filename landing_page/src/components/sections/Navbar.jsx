import { useState, useEffect } from 'react';

const GUIDE_URL = 'https://guide.pill.rocks';

const NAV_LINKS = [
    { label: 'Guide', href: GUIDE_URL },
    { label: 'Examples', href: 'https://github.com/MattSzymonski/Pill-Engine/tree/main/examples' },
    { label: 'GitHub', href: 'https://github.com/MattSzymonski/Pill-Engine' },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            id="navbar"
            className={`fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-24px)] max-w-[var(--container-max)] rounded-xl navbar-glass ${scrolled ? 'navbar-scrolled' : ''}`}
        >
            <div className="flex items-center justify-between h-14 px-5 max-w-[1440px] mx-auto">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <a href="/" className="flex items-center gap-2.5 group">
                        <img
                            src="/pill_logo.svg"
                            alt="Pill Engine"
                            className="h-12 w-12 transition-transform duration-200 group-hover:scale-105"
                        />
                    </a>
                </div>

                {/* Desktop nav links */}
                <div className="hidden md:flex items-center gap-1">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="px-3.5 py-1.5 text-[13px] font-medium text-white/50 hover:text-white rounded-md hover:bg-white/[0.06] transition-all duration-150"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Mobile hamburger - right side */}
                <button
                    type="button"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden flex flex-col gap-1 p-1.5"
                    aria-label="Toggle menu"
                >
                    <div className="w-4 h-px bg-white/60 transition-all" />
                    <div className="w-4 h-px bg-white/60 transition-all" />
                    <div className="w-4 h-px bg-white/60 transition-all" />
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden border-t border-white/[0.06] px-5 py-4 space-y-1">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="block px-3 py-2 text-sm font-medium text-white/50 hover:text-white rounded-md hover:bg-white/[0.06] transition-all duration-150"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href={GUIDE_URL}
                        className="block px-3 py-2 text-sm font-semibold text-white bg-brand-500 hover:bg-brand-400 rounded-md transition-all duration-150 text-center mt-2"
                    >
                        Get Started
                    </a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
