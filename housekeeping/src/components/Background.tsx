import React, { useRef, useEffect } from 'react';
import './Background.css';

const MapBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        const eraseCircle = (x: number, y: number, radius: number) => {
            if (ctx) {
                ctx.globalCompositeOperation = 'destination-out'; 
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, 2 * Math.PI);
                ctx.fill();
            }
        };

        const randomErase = () => {
            if (canvas && ctx) {
                const canvasWidth = canvas.width;
                const canvasHeight = canvas.height;

                // Set the eraser size
                const radius = 20;

                // Erase circles at random positions
                for (let i = 0; i < 100; i++) { 
                    const x = Math.random() * canvasWidth;
                    const y = Math.random() * canvasHeight;
                    eraseCircle(x, y, radius);
                }
            }
        };

        const animateScratch = () => {
            randomErase();
            requestAnimationFrame(animateScratch); 
        };

        const initCanvas = () => {
            if (canvas && ctx) {
                // Set initial canvas size
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                
                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; // Dark layer color
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
        };

       
        initCanvas();

        // Handle window resizing
        const resizeCanvas = () => {
            initCanvas(); // Re-initialize the canvas on resize
        };

        window.addEventListener('resize', resizeCanvas);

        // Event handler for starting the scratch-off effect on click
        const handleClick = () => {
            
            requestAnimationFrame(animateScratch);
        };

        // Add click event listener to canvas
        if (canvas) {
            canvas.addEventListener('click', handleClick);
        }

        
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (canvas) {
                canvas.removeEventListener('click', handleClick);
            }
        };
    }, []);

    return (
        <div className="map-container">
            {/* Canvas for the scratch-off effect */}
            <canvas ref={canvasRef} className="scratch-canvas"></canvas>
        </div>
    );
};

export default MapBackground;