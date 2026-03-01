import { useState, useEffect } from 'react';

export function useIsMobile(breakpoint: number = 768) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if window is defined (so it works with SSR/Next.js)
        if (typeof window !== 'undefined') {
            const checkIsMobile = () => {
                setIsMobile(window.innerWidth < breakpoint);
            };

            // Initial check
            checkIsMobile();

            // Add listener for window resize
            window.addEventListener('resize', checkIsMobile);

            // Cleanup
            return () => {
                window.removeEventListener('resize', checkIsMobile);
            };
        }
    }, [breakpoint]);

    return isMobile;
}
