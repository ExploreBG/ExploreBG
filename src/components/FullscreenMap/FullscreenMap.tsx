import React, { ReactNode, useEffect, useRef } from 'react';

import { useFullscreenCtx } from '@/contexts/FullscreenContext/FullscreenContext';

interface FullscreenMapProps {
    children: ReactNode;
    width?: string;
    height?: string;
}

const FullscreenMap: React.FC<FullscreenMapProps> = ({ children, width, height }) => {
    const { isFullscreen, setIsFullscreen } = useFullscreenCtx();
    const mapRef = useRef<HTMLDivElement>(null);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement && mapRef.current) {
            mapRef.current.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, [setIsFullscreen]);

    return (
        <div
            ref={mapRef}
            style={{
                width: (width ?? '100%'),
                height: (height ?? '31.25rem'),
                borderRadius: '0.5rem',
                position: 'relative'
            }}
        >
            {children}

            <button
                onClick={toggleFullscreen}
                style={{
                    position: 'absolute',
                    bottom: '2rem',
                    right: '0',
                    zIndex: 1000,
                    padding: '0.5rem',
                    backgroundColor: '#d3d3d3ba',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '0.25rem'
                }}
            >
                {isFullscreen ? 'Exit Fullscreen' : 'Go Fullscreen'}
            </button>
        </div>
    );
};

export default FullscreenMap;