import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const ABOUT_PATHS = ['/about-us', '/about', '/aboutus', '/aboutUs'];
const CONTACT_PATHS = ['/contact', '/contact-us', '/contactus', '/contactUs'];

export default function Layout({ children }) {
    const location = useLocation();

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    // Determine page class for page-specific styling
    const getPageClass = () => {
        if (location.pathname === '/') return 'page-landing';
        if (ABOUT_PATHS.includes(location.pathname)) return 'page-about';
        if (CONTACT_PATHS.includes(location.pathname)) return 'page-contact';
        return '';
    };

    return (
        <>
            {/* Fixed Navbar - outside main container for proper stickiness */}
            <Navbar />

            <div className={`relative min-h-screen w-full bg-black text-white font-display overflow-x-hidden antialiased ${getPageClass()}`}>
                {/* Decorative circles */}
                <div className="grid-circle grid-circle-1" aria-hidden="true" />
                <div className="grid-circle grid-circle-2" aria-hidden="true" />
                <div className="grid-circle grid-circle-3" aria-hidden="true" />

                {/* Main content */}
                <main className="flex-1 pt-[73px]">
                    {children}
                </main>

                <Footer />
            </div>
        </>
    );
}
