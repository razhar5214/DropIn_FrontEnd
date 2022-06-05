import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { withScriptjs, withGoogleMap } from 'react-google-maps'
import PlacesAutocomplete, {
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete'
import scriptLoader from 'react-async-script-loader'
import Navbar from './Navbar'
import BuildingMap from './BuildingMap'
import BuildingStreetView from './BuildingStreetView'
import Reviews from './review/Reviews'
import '../styles/ApartmentView.css'

function ApartmentView(props) {
    const { placeID } = useParams()

    const [address, setAddress] = useState('')

    const [coordinates, setCoordinates] = useState({
        lat: null,
        lng: null,
    })

    useEffect(() => {
        console.log('useeffect, not in if-statement', window.google)

        if (window.google) {
            console.log('useeffect triggered, geocode fetched')

            const getGeocodeData = async () => {
                try {
                    const results = await geocodeByPlaceId(placeID);
                    console.log('geocodeByPlaceId results: ', results)

                    const latLng = await getLatLng(results[0]);
                    console.log('latLng', latLng)

                    // const lat = results[0].geometry.location.lat()
                    // const lng = results[0].geometry.location.lng()
                    console.log('lat', results[0].geometry.location.lat())

                    setCoordinates(prevCoords => ({
                        ...prevCoords,
                        lat: latLng.lat,
                        lng: latLng.lng
                    }));

                    setAddress(results[0].formatted_address)

                    // localStorage.setItem('address', value)
                    localStorage.setItem('lat', JSON.stringify(latLng.lat).substr(0, 12))
                    localStorage.setItem('lng', JSON.stringify(latLng.lng).substr(0, 12))
                    localStorage.setItem('placeID', placeID)
                } catch (err) {
                    console.log('Apartment View err:', err)
                }
            }
            getGeocodeData()
        }

    }, [placeID, window.google])

    return (
        <>
            {/* RENDER NAVBAR */}
            <Navbar />

            <div className='apt-view-div'>

                <div className='apt-address'>
                    {/* <h1>{localStorage.getItem('address')}</h1> */}
                    <h1>{address}</h1>
                </div>

                {/* RENDER STREETVIEW OF ADDRESS */}
                <div className='apt-visuals'>
                    <div className='apt-pic'>
                        <div className='streetview'>
                            <BuildingStreetView />   
                        </div>
                    </div>

                    {/* RENDER MAP OF ADDRESS */}
                    <div className='apt-map'>
                        <BuildingMap/>
                    </div>
                </div>

                {/* SHOW RATING OF ADDRESS */}
                <div className='star-rating'>
                    {/* Rating: (insert star pic here) */}
                </div>

                {/* SHOW REVIEWS OF ADDRESS */}
                <Reviews loginStatus={props.loginStatus} />
            </div>
        </>
    )
}
export default scriptLoader([`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API}&libraries=places`])(ApartmentView);