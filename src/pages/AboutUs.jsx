import jaiSingh from '../assets/images/JaiSingh.jpeg';
import aaryanGusain from '../assets/images/aaryanGusain.jpeg';
import { ScrollReveal } from '../hooks/useScrollReveal';

export default function AboutUs() {
    return (
        <>
            {/* Page-specific grid accent */}
            <div className="grid-accent-h" aria-hidden="true" />

            {/* Main Content */}
            <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-16 md:py-20">
                <div className="flex flex-col max-w-[960px] flex-1">
                    <div className="flex flex-col gap-10 px-4 py-6 md:flex-row items-center">
                        <div className="flex flex-col gap-6 md:min-w-[400px] flex-1">
                            <div className="flex flex-col gap-4 text-left">
                                <h1 className="text-white type-h1 tracking-tight anim-hero">
                                    Let our technology simplify the way you <span className="text-primary italic font-semibold highlight-box">experience.</span>
                                </h1>
                                <h3 className="text-white text-2xl font-semibold mt-4 anim-secondary">The Tour Team</h3>
                            </div>

                            {/* Team Photos with grey circle and grid lines behind */}
                            <div className="relative mt-8 py-16">
                                {/* Grey circle with grid lines */}
                                <div
                                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] md:w-[520px] md:h-[520px] rounded-full bg-gray-300"
                                    aria-hidden="true"
                                />
                                {/* Grid lines - horizontal through center */}
                                <div
                                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[750px] h-[1px]"
                                    style={{
                                        background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.3) 20%, rgba(255,255,255,0.3) 80%, transparent 100%)'
                                    }}
                                    aria-hidden="true"
                                />
                                {/* Grid lines - vertical through center */}
                                <div
                                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[600px] md:h-[750px]"
                                    style={{
                                        background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.3) 20%, rgba(255,255,255,0.3) 80%, transparent 100%)'
                                    }}
                                    aria-hidden="true"
                                />

                                <div className="grid grid-cols-2 gap-6 max-w-sm mx-auto relative z-10">
                                    <ScrollReveal animation="fade-up" delay={0} duration={1200}>
                                        <div className="flex flex-col gap-3 group">
                                            <div
                                                className="w-full bg-center bg-no-repeat aspect-[4/5] bg-cover rounded-xl group-hover:scale-105 transition-all duration-500 relative overflow-hidden card-shadow"
                                                style={{ backgroundImage: `url(${jaiSingh})` }}
                                            ></div>
                                            <div className="text-center">
                                                <p className="text-gray-800 type-h3">Jai Singh</p>
                                                <p className="text-gray-700 text-sm font-medium leading-normal">Co-founder & CEO</p>
                                                <p className="text-gray-600 text-xs mt-1">
                                                    University of Michigan, College of Engineering
                                                </p>
                                            </div>
                                        </div>
                                    </ScrollReveal>

                                    <ScrollReveal animation="fade-up" delay={150} duration={1200}>
                                        <div className="flex flex-col gap-3 group">
                                            <div
                                                className="w-full bg-center bg-no-repeat aspect-[4/5] bg-cover rounded-xl group-hover:scale-105 transition-all duration-500 relative overflow-hidden card-shadow"
                                                style={{ backgroundImage: `url(${aaryanGusain})` }}
                                            ></div>
                                            <div className="text-center">
                                                <p className="text-gray-800 type-h3">Aaryan Gusain</p>
                                                <p className="text-gray-700 text-sm font-medium leading-normal">Co-founder & CTO</p>
                                                <p className="text-gray-600 text-xs mt-1">
                                                    University of Illinois, Grainger College of Engineering
                                                </p>
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                </div>
                            </div>

                            <ScrollReveal animation="fade-up" delay={300} duration={1200} className="mt-12">
                                <h3 className="text-white text-2xl font-bold mb-6">Our Story</h3>
                                <p className="text-beige-dim leading-relaxed text-base">
                                    We've spent years scrolling through social media to find those hidden local spots, the cozy cafes, the under-the-radar restaurants. Those always ended up being the most memorable experiences. But the process was fragmented and time-consuming, and we knew there had to be a better way. As we began to explore the world more, it became clear that discovering novel local spots was unnecessarily hard. We saw an opportunity to turn the content people already love into real-world experiences, no stress, no endless scrolling. That's why we built Tour.
                                </p>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
