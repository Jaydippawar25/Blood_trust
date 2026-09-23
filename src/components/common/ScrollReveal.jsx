import React, { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal Component
 * Smoothly animates children into view when scrolled into the viewport.
 * Supports: 'fade-up', 'fade-down', 'slide-left', 'slide-right', 'scale-up', 'flip-up'
 */
export default function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 750,
  className = '',
  threshold = 0.12
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  const getInitialStyles = () => {
    if (isVisible) {
      return 'opacity-100 translate-x-0 translate-y-0 scale-100 rotate-0 blur-0';
    }

    switch (animation) {
      case 'fade-up':
        return 'opacity-0 translate-y-12 scale-[0.97] blur-[2px]';
      case 'fade-down':
        return 'opacity-0 -translate-y-12 scale-[0.97] blur-[2px]';
      case 'slide-left':
        return 'opacity-0 -translate-x-16 blur-[1px]';
      case 'slide-right':
        return 'opacity-0 translate-x-16 blur-[1px]';
      case 'scale-up':
        return 'opacity-0 scale-85 blur-[4px]';
      case 'flip-up':
        return 'opacity-0 translate-y-10 rotate-2 scale-95';
      default:
        return 'opacity-0 translate-y-10';
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)'
      }}
      className={`transition-all transform-gpu will-change-transform ${getInitialStyles()} ${className}`}
    >
      {children}
    </div>
  );
}
