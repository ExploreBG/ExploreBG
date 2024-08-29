import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-gpx';

interface GpxLayerProps {
    url: string;
}

const GpxLayer: React.FC<GpxLayerProps> = ({ url }) => {
    const map = useMap();

    useEffect(() => {
        if (!map) {
            console.error("Map is not initialized!");
            return;
        }

        const gpxLayer = new L.GPX(url, {
            async: true,
            // marker_options: {
            //     startIconUrl: 'https://cdn.jsdelivr.net/npm/leaflet-gpx@1.7.0/pin-icon-start.png',
            //     endIconUrl: 'https://cdn.jsdelivr.net/npm/leaflet-gpx@1.7.0/pin-icon-end.png',
            //     shadowUrl: 'https://cdn.jsdelivr.net/npm/leaflet-gpx@1.7.0/pin-shadow.png'
            // },
            polyline_options: {
                color: 'blue',
                weight: 3,
                opacity: 0.75,
                lineCap: 'round',
            },
        });

        gpxLayer.on('error', function (e) {
            console.error('Error loading file: ' + e);
        });

        gpxLayer.on('loaded', function (e) {
            const gpx = e.target;

            map.fitBounds(gpx.getBounds());
        });

        gpxLayer.addTo(map);

        return () => {
            map.removeLayer(gpxLayer);
        };
    }, [map, url]);

    return null;
};

export default GpxLayer;