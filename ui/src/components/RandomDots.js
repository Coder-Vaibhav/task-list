import React, { useEffect, useState } from 'react';
import './../style.css'; // Import CSS file if using external styles

export const RandomDots = () => {
    const [dots, setDots] = useState([]);

    useEffect(() => {
        createDots();
        const interval = setInterval(moveDots, 50);
        return () => clearInterval(interval);
    }, []);

    const createDots = () => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const dotSize = 10;
        const spacing = 50;
        const numDotsX = Math.ceil(screenWidth / spacing);
        const numDotsY = Math.ceil(screenHeight / spacing);
        const dotsArray = [];

        for (let i = 0; i < numDotsX; i++) {
            for (let j = 0; j < numDotsY; j++) {
                dotsArray.push({ top: `${j * spacing - dotSize / 2}px`, left: `${i * spacing - dotSize / 2}px` });
            }
        }
        setDots(dotsArray);
    };

    const moveDots = () => {
        setDots(prevDots => prevDots.map(dot => {
            const currentX = parseFloat(dot.left);
            const currentY = parseFloat(dot.top);
            const newX = currentX + (Math.random() * 4 - 2);
            const newY = currentY + (Math.random() * 4 - 2);

            return {
                ...dot,
                left: `${newX}px`,
                top: `${newY}px`
            };
        }));
    };

    const handleMouseMove = (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const radius = 150; // Adjust the radius as needed

        setDots(prevDots => prevDots.map(dot => {
            const dotX = parseFloat(dot.left) + 5; // Assuming dot size is 10px
            const dotY = parseFloat(dot.top) + 5; // Assuming dot size is 10px
            const distance = Math.sqrt(Math.pow(mouseX - dotX, 2) + Math.pow(mouseY - dotY, 2));

            if (distance <= radius) {
                return { ...dot, backgroundColor: 'red' };
            } else {
                return { ...dot, backgroundColor: 'white' };
            }
        }));
    };

    return (
        <div className="random-dots" onMouseMove={handleMouseMove}>
            {dots.map((dot, index) => (
                <div key={index} className="dot" style={{ top: dot.top, left: dot.left }}></div>
            ))}
        </div>
    );
};

