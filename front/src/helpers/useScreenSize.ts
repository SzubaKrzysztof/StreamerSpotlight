import { useEffect, useState } from 'react';

export type ScreenSize = {
    width: number;
    height: number;
};

const MOBILE_BREAKPOINT = 720;

export const useIsSmallScreen = (): boolean => {
    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        window.addEventListener('resize', onResize);

        onResize();

        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);

    const onResize = () => {
        if (typeof window === 'undefined') return;
        setIsSmallScreen(window.innerWidth < MOBILE_BREAKPOINT);
    };

    return isSmallScreen;
};
