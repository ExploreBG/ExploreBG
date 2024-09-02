import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

import { MAP_FUNCTIONALITIES_BACKGR_COLOR } from '@/utils/constants';

interface LocateUserOnMapProps {
    location?: { name: string, position: [number, number] };
}

const LocateUserOnMap: React.FC<LocateUserOnMapProps> = ({ location }) => {
    const map = useMap();

    const handleLocate = () => {
        map.locate({ setView: true, maxZoom: 16 });
    };

    useEffect(() => {
        const onLocationFound = (e: L.LocationEvent) => {
            const radius = e.accuracy / 2;
            const latLng = [e.latlng.lat, e.latlng.lng] as [number, number];
            const userCoord = L.latLng(latLng[0], latLng[1]);

            const locationCoord = location
                ? L.latLng(location.position[0], location.position[1])
                : userCoord;
            const distanceInMeters = userCoord.distanceTo(locationCoord);
            const distance = distanceInMeters > 1000
                ? `${(distanceInMeters / 1000).toFixed()} km`
                : `${distanceInMeters.toFixed()} meters`;

            L.marker(latLng)
                .addTo(map)
                .bindPopup(location ? `You are within ${distance} from ${location.name}` : 'You are here')
                .openPopup();
            L.circle(latLng, radius).addTo(map);
        };

        map.on('locationfound', onLocationFound);

        return () => {
            map.off('locationfound', onLocationFound);
        };
    }, [map, location?.name, location?.position]);

    return (
        <button
            onClick={handleLocate}
            style={{
                position: 'absolute',
                top: '0.625rem',
                left: '3.5rem',
                zIndex: '1000',
                backgroundColor: MAP_FUNCTIONALITIES_BACKGR_COLOR,
                color: 'black',
                cursor: 'pointer'
            }}
        >
            Locate Me
        </button>
    );
};

export default LocateUserOnMap;