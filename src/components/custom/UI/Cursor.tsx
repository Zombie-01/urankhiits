import React, { useState, useEffect } from 'react';

const Cursor = () => {
    const [cursorXY, setCursorXY] = useState({ x: -100, y: -100 });
    const [hoverEffect, setHoverEffect] = useState(false);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setCursorXY({ x: event.clientX, y: event.clientY });
        };

        const handleMouseEnter = () => setHoverEffect(true);
        const handleMouseLeave = () => setHoverEffect(false);

        window.addEventListener('mousemove', handleMouseMove);

        const links = document.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('mouseenter', handleMouseEnter);
            link.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            links.forEach(link => {
                link.removeEventListener('mouseenter', handleMouseEnter);
                link.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    const cursorRingStyle: React.CSSProperties = {
        position: 'fixed',
        left: `${cursorXY.x}px`,
        top: `${cursorXY.y}px`,
        width: hoverEffect ? '100px' : '40px',
        height: hoverEffect ? '100px' : '40px',
        borderRadius: '50%',
        border: '2px solid gray',
        backgroundColor: 'transparent',
        transform: 'translate(-50%, -50%)',
        transition: 'width 0.6s ease, height 0.6s ease, border-width 0.6s ease',
        pointerEvents: 'none',
        zIndex: 10000,
        opacity: hoverEffect ? 0 : 1,
    };

    return <div style={cursorRingStyle}></div>;
};

export default Cursor;
