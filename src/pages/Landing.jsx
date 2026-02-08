import { Link } from 'react-router-dom';
import kyotoCafeVideo from '../assets/images/videos/0207(1).mp4';
import kyotoCafeVideoMobile from '../assets/images/videos/0207_mobile.mp4';
import discoveryVideo from '../assets/images/videos/0208.mp4';
import { ScrollReveal } from '../hooks/useScrollReveal';

// Glass card component - almost fully transparent with subtle shine
function GlassCard({ children, className = '' }) {
    return (
        <div className={`relative ${className}`}>
            {/* Glass front layer - almost fully transparent */}
            <div
                className="absolute inset-0 rounded-2xl overflow-hidden"
                style={{
                    boxShadow: `
                        0 0 0 1px hsla(0, 0%, 100%, 0.3) inset,
                        0 1px 0 0 hsla(0, 0%, 100%, 0.3) inset
                    `,
                }}
            >
                {/* Subtle shine gradient overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(135deg, hsla(0, 0%, 100%, 0.12) 0%, transparent 40%)',
                        pointerEvents: 'none',
                    }}
                />
            </div>
            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}

export default function Landing() {
    return (
        <>
            {/* Page-specific grid accents */}
            <div className="grid-accent-2" aria-hidden="true" />

            {/* Hero Section */}
            <div className="flex-1 flex flex-col py-16 md:py-20 px-4 md:px-10 hero-section">
                <div className="max-w-[1200px] w-full mx-auto">
                    {/* Beta Access Badge */}
                    <div className="flex items-center gap-2 mb-6 anim-secondary">
                        <Link
                            to="/contact"
                            className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-beige-text text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-all cursor-pointer highlight-box"
                        >
                            Beta Access Open
                        </Link>
                    </div>

                    {/* Headline */}
                    <div className="mb-12 text-left">
                        <h1 className="text-white type-h1 tracking-tight mb-3 anim-hero">
                            Your Personal Vibe
                        </h1>
                        <h1 className="text-white type-h1 tracking-tight anim-hero" style={{ animationDelay: '0.5s' }}>
                            Turned Into <span className="text-beige-text anim-scale" style={{ animationDelay: '1.2s', display: 'inline-block' }}>Personal Experiences</span>
                        </h1>
                    </div>

                    {/* Image and description row */}
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:items-center">
                        {/* Hero media */}
                        <div className="flex-1 w-full relative group anim-left">
                            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-surface-dark border border-white/10 card-shadow reflection-hover anim-scale">
                                <video
                                    className="absolute inset-0 w-full h-full object-cover"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    preload="metadata"
                                >
                                    <source src={kyotoCafeVideoMobile} media="(max-width: 767px)" type="video/mp4" />
                                    <source src={kyotoCafeVideo} type="video/mp4" />
                                </video>
                            </div>
                        </div>

                        {/* Description text */}
                        <div className="flex-1 flex items-center anim-right">
                            <p className="text-beige-dim type-body measure anim-primary">
                                Stop scrolling, start experiencing. Our <span className="highlight-box">AI analyzes</span> the Reels, TikToks, pinned places, notes, and Tour's proprietary personality quiz you share to curate daily, novel recommendations for cafes, dining, and hidden gems near you.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-20 border-y border-white/5 relative" id="features">
                <div className="px-6 md:px-10 max-w-[1200px] mx-auto">
                    <div className="flex flex-col md:flex-row gap-12 md:gap-20">
                        <ScrollReveal animation="fade-left" duration={1200} className="md:w-1/3 flex flex-col justify-center">
                            <h2 className="type-h2 mb-6 text-white">
                                From Shares to <br /><span className="text-beige-text">Experiences</span>
                            </h2>
                            <p className="text-beige-dim type-body measure mb-8">
                                Our AI analyzes the content you share and how you interact with the app to discover local spots that match your aesthetic and vibe perfectly. No more generic "Top 10" lists.
                            </p>
                        </ScrollReveal>

                        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <ScrollReveal animation="fade-up" delay={0} duration={1200}>
                                <div className="p-6 rounded-xl bg-surface-dark border border-white/5 hover:border-beige-text/30 transition-all group card-shadow h-full">
                                    <div className="w-12 h-12 rounded-lg bg-black flex items-center justify-center mb-4 group-hover:bg-white/5 transition-colors">
                                        <span className="material-symbols-outlined text-white group-hover:text-beige-text transition-colors">share</span>
                                    </div>
                                    <h3 className="text-white font-bold text-lg mb-2">Share to Tour</h3>
                                    <p className="text-beige-dim text-sm leading-relaxed">
                                        Share Reels, TikToks, pinned places on maps, individual notes, or take Tour's proprietary personality quiz.
                                    </p>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal animation="fade-up" delay={150} duration={1200}>
                                <div className="p-6 rounded-xl bg-surface-dark border border-white/5 hover:border-beige-text/30 transition-all group card-shadow h-full">
                                    <div className="w-12 h-12 rounded-lg bg-black flex items-center justify-center mb-4 group-hover:bg-white/5 transition-colors">
                                        <span className="material-symbols-outlined text-white group-hover:text-beige-text transition-colors">neurology</span>
                                    </div>
                                    <h3 className="text-white font-bold text-lg mb-2">AI Analysis</h3>
                                    <p className="text-beige-dim text-sm leading-relaxed">
                                        Our algorithms decode your taste, from 'cozy minimalist cafe' to 'cyberpunk ramen bar'.
                                    </p>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal animation="fade-up" delay={300} duration={1200}>
                                <div className="p-6 rounded-xl bg-surface-dark border border-white/5 hover:border-beige-text/30 transition-all group card-shadow h-full">
                                    <div className="w-12 h-12 rounded-lg bg-black flex items-center justify-center mb-4 group-hover:bg-white/5 transition-colors">
                                        <span className="material-symbols-outlined text-white group-hover:text-beige-text transition-colors">calendar_month</span>
                                    </div>
                                    <h3 className="text-white font-bold text-lg mb-2">Fresh Curations</h3>
                                    <p className="text-beige-dim text-sm leading-relaxed">
                                        Get personalized recommendations whenever you want, however you want.
                                    </p>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </div>

            {/* Discovery Section */}
            <div className="py-24 px-6 max-w-[1200px] mx-auto w-full" id="how-it-works">
                <ScrollReveal animation="fade-up" duration={1200} className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Discover What You <span className="highlight-box">Actually Like.</span>
                    </h2>
                    <p className="text-beige-dim">
                        Escape the 'Top 10' lists. Find spots that match your specific aesthetic.
                    </p>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <ScrollReveal animation="fade-left" duration={1200}>
                        <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/10 bg-surface-dark">
                            <video
                                className="absolute inset-0 w-full h-full object-cover"
                                src={discoveryVideo}
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="metadata"
                            />
                        </div>
                    </ScrollReveal>

                    <div className="flex flex-col gap-6">
                        <ScrollReveal animation="fade-right" delay={0} duration={1200}>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 mt-1">
                                    <span className="material-symbols-outlined text-beige-text">check_circle</span>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">Hyper-Personalized</h4>
                                    <p className="text-beige-dim text-sm mt-1">
                                        We don't just guess. We know you prefer speakeasies over clubs and matcha over coffee.
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal animation="fade-right" delay={150} duration={1200}>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 mt-1">
                                    <span className="material-symbols-outlined text-beige-text">check_circle</span>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">Spontaneous Discovery</h4>
                                    <p className="text-beige-dim text-sm mt-1">
                                        Need a spot right now? Our AI finds open hidden gems nearby that fit your mood.
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal animation="fade-right" delay={300} duration={1200}>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 mt-1">
                                    <span className="material-symbols-outlined text-beige-text">check_circle</span>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">Novel Experiences, Always</h4>
                                    <p className="text-beige-dim text-sm mt-1">
                                        We constantly surface new openings and under-the-radar spots so your weekends never feel stale.
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-24 px-4 border-t border-white/5 relative">
                <ScrollReveal animation="scale" duration={1200} className="max-w-[800px] mx-auto relative z-10 text-center flex flex-col gap-8">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Ready to experience the world<br /><span className="highlight-box">your way?</span>
                        </h2>
                        <p className="text-beige-dim text-lg mb-6">
                            Join the waitlist to get early access and receive your first personalized drop of local gems.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-beige-text text-black font-bold rounded-lg hover:bg-white transition-all reflection-hover anim-glow"
                        >
                            Get Beta Access
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                    </div>
                </ScrollReveal>
            </div>
        </>
    );
}
