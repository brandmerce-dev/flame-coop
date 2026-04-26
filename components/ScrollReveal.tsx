'use client';

import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    function check() {
      document.querySelectorAll<HTMLElement>('.reveal:not(.visible)').forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight - 60) {
          el.classList.add('visible');
        }
      });
    }
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('load', check);
    check();
    const t = setTimeout(check, 300);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('load', check);
      clearTimeout(t);
    };
  }, []);

  return null;
}
