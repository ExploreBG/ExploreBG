import React, { useState } from 'react';
import { useMapEvents } from 'react-leaflet';

import { MAP_FUNCTIONALITIES_BACKGR_COLOR } from '@/utils/constants';

interface MouseCoordinatesOnMapProps { }

const MouseCoordinatesOnMap: React.FC<MouseCoordinatesOnMapProps> = () => {
    const [coords, setCoords] = useState<[number, number] | null>(null);

    useMapEvents({
        mousemove(e) {
            setCoords([e.latlng.lat, e.latlng.lng]);
        }
    });

    return coords
        ? (
            <div style={{
                position: 'absolute',
                bottom: 10,
                left: 10,
                zIndex: 1000,
                padding: '0.5rem',
                backgroundColor: MAP_FUNCTIONALITIES_BACKGR_COLOR,
                color: 'black',
                borderRadius: '0.25rem'
            }}>
                <span>Lat: {coords[0].toFixed(5)}, Lng: {coords[1].toFixed(5)}</span>
            </div>
        )
        : null;
};

export default MouseCoordinatesOnMap;