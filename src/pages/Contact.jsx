import { useState } from 'react';
import { ScrollReveal } from '../hooks/useScrollReveal';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        reason: 'General Inquiry',
        message: '',
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: 'success', message: 'Sending...' });

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    subject: formData.reason,
                }),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                throw new Error(data?.error || 'Failed to send message');
            }

            setStatus({
                type: 'success',
                message: "Message received! We'll be in touch soon.",
            });
            setFormData({ name: '', email: '', reason: 'General Inquiry', message: '' });
        } catch (err) {
            setStatus({
                type: 'error',
                message: err?.message || 'Failed to send message',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <main className="px-6 py-16 md:py-20">
                <section className="max-w-4xl mx-auto text-center mb-16">
                    <p className="inline-flex items-center gap-2 px-3 py-1 border border-white/10 uppercase text-xs tracking-[0.3em] text-primary/80 anim-secondary">
                        <span className="size-1.5 rounded-full bg-primary animate-pulse"></span>
                        Available on the App Store
                    </p>
                    <h1 className="type-h1 mt-6 anim-hero">Contact Us</h1>
                    <p className="text-beige-dim type-body measure mx-auto mt-4 anim-primary">
                        Have a question, feedback, or just want to say hi? Ask us anything! We're here to chat. Oh, and by the way, Tour is now available on the App Store!
                    </p>
                </section>

                <section className="max-w-6xl mx-auto flex justify-center">
                    <ScrollReveal animation="scale" duration={700}>
                        <div className="w-full max-w-3xl bg-surface-dark border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/30 card-shadow">
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ScrollReveal animation="fade-left" delay={100} className="flex flex-col gap-2">
                                    <label className="type-label text-white/80" htmlFor="contact-name">
                                        Full Name
                                    </label>
                                    <input
                                        id="contact-name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="bg-background-dark border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-beige-dim focus:border-primary focus:ring-1 focus:ring-primary/40 transition shadow-inner"
                                        placeholder="Alex Traveler"
                                        type="text"
                                        required
                                    />
                                </ScrollReveal>

                                <ScrollReveal animation="fade-right" delay={100} className="flex flex-col gap-2">
                                    <label className="type-label text-white/80" htmlFor="contact-email">
                                        Email
                                    </label>
                                    <input
                                        id="contact-email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="bg-background-dark border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-beige-dim focus:border-primary focus:ring-1 focus:ring-primary/40 transition shadow-inner"
                                        placeholder="alex@example.com"
                                        type="email"
                                        required
                                    />
                                </ScrollReveal>

                                <ScrollReveal animation="fade-up" delay={200} className="flex flex-col gap-2 md:col-span-2">
                                    <label className="type-label text-white/80" htmlFor="contact-reason">
                                        Reason for Contact
                                    </label>
                                    <select
                                        id="contact-reason"
                                        name="reason"
                                        value={formData.reason}
                                        onChange={handleChange}
                                        className="bg-background-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary/40 transition"
                                        required
                                    >
                                        <option value="General Inquiry">General Inquiry</option>
                                        <option value="Partnerships">Partnerships</option>
                                        <option value="Press">Press</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </ScrollReveal>

                                <ScrollReveal animation="fade-up" delay={300} className="flex flex-col gap-2 md:col-span-2">
                                    <label className="type-label text-white/80" htmlFor="contact-message">
                                        Your Message <span className="text-beige-dim">(optional)</span>
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="bg-background-dark border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-beige-dim min-h-[160px] focus:border-primary focus:ring-1 focus:ring-primary/40 transition shadow-inner"
                                        placeholder="What's on your mind? We'd love to hear from you."
                                    ></textarea>
                                </ScrollReveal>

                                <div className="md:col-span-2 flex flex-col gap-4">
                                    <div className="flex items-center gap-3 text-beige-dim text-sm">
                                        <span className="material-symbols-outlined text-base text-primary">lock</span>
                                        We never share your contact info. Encrypted end-to-end.
                                    </div>

                                    {status.message && (
                                        <div
                                            className={`text-sm ${status.type === 'success' ? 'text-green-400' : 'text-red-400'
                                                }`}
                                        >
                                            {status.message}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-primary text-black font-bold py-3 rounded-lg hover:bg-white transition disabled:opacity-60 disabled:cursor-not-allowed reflection-hover anim-glow"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </ScrollReveal>
                </section>
            </main>
        </>
    );
}
