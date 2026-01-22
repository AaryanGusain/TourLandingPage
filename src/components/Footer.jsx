import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="border-t border-white/5 py-12 px-6">
            <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-3">
                    <span className="text-white font-bold text-lg">Tour</span>
                </div>
                <div className="flex flex-wrap justify-center gap-8 text-sm">
                    <Link
                        to="/contactUs"
                        className="text-beige-dim hover:text-white transition-colors"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </footer>
    );
}
