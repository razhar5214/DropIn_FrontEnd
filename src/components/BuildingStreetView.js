
import React from 'react';
import { GoogleMap, StreetViewPanorama, useJsApiLoader } from '@react-google-maps/api';

const mapContainerStyle = {
    width: '100%',
    height: '100%'
};

const center = {
    lat: JSON.parse(localStorage.getItem('lat')),
    lng: JSON.parse(localStorage.getItem('lng'))
};

const options = {
    position: {
        lat: JSON.parse(localStorage.getItem('lat')),
        lng: JSON.parse(localStorage.getItem('lng'))
    },
    pov: { heading: -100, pitch: 0 },
    zoom: 1,
    source: 'outdoor'
}

export default function BuildingStreetView() {
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API
    })

    if (loadError) {
        return <div>Map cannot be loaded right now, sorry.</div>
    }

    return isLoaded ? (
        <GoogleMap
            id="circle-example"
            mapContainerStyle={mapContainerStyle}
            zoom={7}
            center={center}
        >
            <StreetViewPanorama
                position={center}
                visible={true}
                options={options}
            />
        </GoogleMap>
    ) : <></>
}