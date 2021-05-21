import {BaseSyntheticEvent, RefObject, useEffect} from 'react';

export default function useOnClickOutside(ref: RefObject<HTMLDivElement>, handler: (e: BaseSyntheticEvent | MouseEvent | TouchEvent) => void) {
    useEffect(
        () => {
            const listener = (event: BaseSyntheticEvent | MouseEvent | TouchEvent) => {
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }

                handler(event);
            };

            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);

            return () => {
                document.removeEventListener('mousedown', listener);
                document.removeEventListener('touchstart', listener);
            };
        },
        [ref, handler]
    );
}