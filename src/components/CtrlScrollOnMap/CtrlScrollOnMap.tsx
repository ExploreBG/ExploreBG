import React, { useState, useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';

import { useFullscreenCtx } from '@/contexts/FullscreenContext';
import { MAP_FUNCTIONALITIES_BACKGR_COLOR } from '@/utils/constants';

interface CtrlScrollOnMapProps { }

const CtrlScrollOnMap: React.FC<CtrlScrollOnMapProps> = () => {
    const [ctrlPressed, setCtrlPressed] = useState<boolean>(false);
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const { isFullscreen } = useFullscreenCtx();
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const messageTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const map = useMap();

    useEffect(() => {
        const mapContainer = mapContainerRef.current;

        const handleScroll = () => {
            if (!ctrlPressed && !isFullscreen) {
                map.scrollWheelZoom.disable();
                setShowMessage(true);

                if (messageTimeoutRef.current) {
                    clearTimeout(messageTimeoutRef.current);
                }

                messageTimeoutRef.current = setTimeout(() => {
                    setShowMessage(false);
                }, 1500);
            } else {
                map.scrollWheelZoom.enable();
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Control') {
                setCtrlPressed(true);
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'Control') {
                setCtrlPressed(false);
            }
        };

        if (mapContainer) {
            mapContainer.addEventListener('wheel', handleScroll, { passive: false });
        }

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            if (mapContainer) {
                mapContainer.removeEventListener('wheel', handleScroll);
            }
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);

            if (messageTimeoutRef.current) {
                clearTimeout(messageTimeoutRef.current);
            }
        };
    }, [ctrlPressed, isFullscreen, map]);

    return (
        <div
            ref={mapContainerRef}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            {showMessage && (
                <div
                    style={{
                        position: 'absolute',
                        backgroundColor: MAP_FUNCTIONALITIES_BACKGR_COLOR,
                        color: 'black',
                        padding: '0.25rem',
                        borderRadius: '0.25rem',
                        zIndex: 1000,
                        pointerEvents: 'none'
                    }}
                >
                    Press &apos;Ctrl&apos; + scroll to zoom the map
                </div>
            )}
        </div>
    );
};

export default CtrlScrollOnMap;