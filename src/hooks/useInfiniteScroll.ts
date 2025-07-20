import {useEffect} from 'react';

export function useInfiniteScroll(callback: () => void) {
    useEffect(() => {
        const onScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
                callback();
            }
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [callback]);
}
