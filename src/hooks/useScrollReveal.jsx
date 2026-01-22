import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-triggered animations using Intersection Observer
 * Provides smooth reveal animations when elements scroll into view
 */
export function useScrollReveal(options = {}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Only trigger once - when element enters viewport
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(element);
                }
            },
            {
                threshold: options.threshold ?? 0.1,
                rootMargin: options.rootMargin ?? '0px 0px -50px 0px',
            }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [options.threshold, options.rootMargin]);

    return { ref, isVisible };
}

/**
 * Scroll reveal component wrapper
 * Wraps children with scroll-triggered animation
 */
export function ScrollReveal({
    children,
    animation = 'fade-up',
    delay = 0,
    duration = 600,
    threshold = 0.1,
    className = '',
    as: Component = 'div'
}) {
    const { ref, isVisible } = useScrollReveal({ threshold });

    const animationClass = isVisible ? `scroll-reveal-visible scroll-${animation}` : 'scroll-reveal-hidden';

    return (
        <Component
            ref={ref}
            className={`scroll-reveal ${animationClass} ${className}`}
            style={{
                '--scroll-delay': `${delay}ms`,
                '--scroll-duration': `${duration}ms`
            }}
        >
            {children}
        </Component>
    );
}

export default ScrollReveal;
