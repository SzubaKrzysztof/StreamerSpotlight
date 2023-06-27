import { useEffect, useState } from 'react';

export type ScreenSize = {
    width: number;
    height: number;
};

export const useScreenSize = (): ScreenSize => {
    const [screenSize, setScreenSize] = useState<ScreenSize>({
        width: 0,
        height: 0,
    });

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
        setScreenSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    return screenSize;
};
