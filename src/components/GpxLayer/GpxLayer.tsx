import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-gpx';

import { ITrackInfo } from '@/interfaces/interfaces';

interface GpxLayerProps {
    url: string;
    setTrackInfo: Dispatch<SetStateAction<ITrackInfo | null>>
}

const GpxLayer: React.FC<GpxLayerProps> = ({ url, setTrackInfo }) => {
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

            const name = gpx.get_name() || 'Unnamed Track';
            const distance = gpx.get_distance();
            const startTime = gpx.get_start_time();
            const endTime = gpx.get_end_time();
            const movingTimeInMs = gpx.get_moving_time();
            const movingTime = gpx.get_duration_string(movingTimeInMs, true);
            const totalTimeInMs = gpx.get_total_time();
            const totalTime = gpx.get_duration_string(totalTimeInMs, true);
            const movingPaceInMs = gpx.get_moving_pace();
            const movingPace = gpx.get_duration_string(movingPaceInMs, true);
            const movingSpeed = gpx.get_moving_speed();
            const totalSpeed = gpx.get_total_speed();
            const elevationMin = gpx.get_elevation_min();
            const elevationMax = gpx.get_elevation_max();
            const elevationGain = gpx.get_elevation_gain();
            const elevationLoss = gpx.get_elevation_loss();
            const speedMax = gpx.get_speed_max();
            const averageHr = gpx.get_average_hr();
            const averageCadence = gpx.get_average_cadence();
            const averageTemp = gpx.get_average_temp();

            setTrackInfo({
                name, distance, startTime, endTime, movingTime, totalTime,
                movingPace, movingSpeed, totalSpeed, elevationMin, elevationMax, elevationGain,
                elevationLoss, speedMax, averageHr, averageCadence, averageTemp
            });
        });

        gpxLayer.addTo(map);

        return () => {
            map.removeLayer(gpxLayer);
        };
    }, [map, url, setTrackInfo]);

    return null;
};

export default GpxLayer;