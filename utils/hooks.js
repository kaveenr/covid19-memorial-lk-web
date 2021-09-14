import { useCallback, useEffect } from 'react';

export const intersectHook = (func, margin, ref) => {
    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            func();
        }
      }, []);
    
      useEffect(() => {
        const option = {
          root: null,
          rootMargin: margin,
          threshold: 0
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if (ref.current) observer.observe(ref.current);
      }, [ref]);
}