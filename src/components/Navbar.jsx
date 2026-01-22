import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="w-full border-b border-white/10 bg-black/95 backdrop-blur-sm fixed top-0 left-0 right-0 z-[100]">
            <div className="flex items-center justify-between px-6 py-4 max-w-[1200px] mx-auto w-full">
                <Link to="/" className="flex items-center gap-3">
                    <h2 className="text-white text-xl font-bold tracking-tight">Tour</h2>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link
                        to="/"
                        className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-white' : 'text-beige-text hover:text-white'
                            }`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/aboutUs"
                        className={`text-sm font-medium transition-colors ${isActive('/aboutUs') ? 'text-white' : 'text-beige-text hover:text-white'
                            }`}
                    >
                        About Us
                    </Link>
                    <Link
                        to="/contactUs"
                        className={`text-sm font-medium transition-colors ${isActive('/contactUs') ? 'text-white' : 'text-beige-text hover:text-white'
                            }`}
                    >
                        Contact
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    {/* Mobile hamburger button */}
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="md:hidden flex items-center justify-center w-10 h-10 text-beige-text hover:text-white transition-colors"
                        aria-label="Open menu"
                    >
                        <span className="material-symbols-outlined text-2xl">menu</span>
                    </button>

                    <Link
                        to="/contactUs"
                        className="flex items-center justify-center rounded-lg h-10 px-5 bg-beige-text hover:bg-white transition-all text-black text-sm font-bold border border-transparent reflection-hover"
                    >
                        Join Waitlist
                    </Link>
                </div>
            </div>

            {/* Mobile menu overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 bg-black backdrop-blur-md z-[60] md:hidden">
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                            <Link to="/" className="flex items-center gap-3">
                                <h2 className="text-white text-xl font-bold tracking-tight">Tour</h2>
                            </Link>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center justify-center w-10 h-10 text-beige-text hover:text-white transition-colors"
                                aria-label="Close menu"
                            >
                                <span className="material-symbols-outlined text-2xl">close</span>
                            </button>
                        </div>

                        <nav className="flex flex-col gap-2 p-6">
                            <Link
                                to="/"
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-beige-text hover:text-white text-lg font-medium transition-colors py-3 border-b border-white/10"
                            >
                                Home
                            </Link>
                            <Link
                                to="/aboutUs"
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-beige-text hover:text-white text-lg font-medium transition-colors py-3 border-b border-white/10"
                            >
                                About Us
                            </Link>
                            <Link
                                to="/contactUs"
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-beige-text hover:text-white text-lg font-medium transition-colors py-3 border-b border-white/10"
                            >
                                Contact
                            </Link>
                        </nav>

                        <div className="mt-auto p-6">
                            <Link
                                to="/contactUs"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center justify-center rounded-lg h-12 px-5 bg-beige-text hover:bg-white transition-all text-black text-base font-bold w-full"
                            >
                                Join Waitlist
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
