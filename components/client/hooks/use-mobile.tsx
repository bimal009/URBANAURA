// hooks/use-mobile.ts
import useMedia from 'use-media';

export const useMediaStatus = () => {
    const isWide = useMedia({ maxWidth: '1024px' });
    const reduceMotion = useMedia('(prefers-reduced-motion: reduce)');

    return { isWide, reduceMotion };
};
