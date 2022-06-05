import React from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '100%'
}

const center = {
    lat: JSON.parse(localStorage.getItem('lat')),
    lng: JSON.parse(localStorage.getItem('lng'))
}

export default function Map(props) {
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        // const bounds = new window.google.maps.LatLngBounds(center)
        // map.fitBounds(bounds)
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    if (loadError) {
        return <div>Map cannot be loaded right now, sorry.</div>
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={18}
            center={center}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <Marker position={{
                lat: JSON.parse(localStorage.getItem('lat')),
                lng: JSON.parse(localStorage.getItem('lng'))
            }} />
        </GoogleMap>
    ) : <></>
}