import React from "react"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import PlacesAutocomplete from 'react-places-autocomplete'
// import Autocomplete from "react-google-autocomplete";
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// import ReactStreetview from 'react-streetview';
import Streetview from 'react-google-streetview';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import scriptLoader from 'react-async-script-loader'


function AutoSearch(props, isScriptLoaded, isScriptLoadSucceed) {
    console.log(props);
    const [address, setAddress] = useState("");

    let navigate = useNavigate()

    const [coordinates, setCoordinates] = useState({
        lat: null,
        lng: null,
    });

    const handleChange = (value) => {
        setAddress(value)
    }

    // const handleSelect = (value) => {
    //     console.log('handle select', address)
    //     setAddress(value)
    //     props.updateAddress(address)
    //     localStorage.setItem("address", value)
    //     // navigate('/apartment-view')

    //     geocodeByAddress(value)
    //         .then(results => getLatLng(results[0]))
    //         .then(latLng => console.log('Success', latLng))
    //         .catch(error => console.error('Error', error))
    //     ;

    // }


    const handleSelect = async (value) => {
        console.log('in handleSelect', address)
        console.log('in handleSelect',coordinates)

        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);

        setCoordinates(latLng);
        setAddress(value)
        props.updateAddress(address)
        props.updateCoordinates(coordinates)
        localStorage.setItem("address", value)
        // navigate('/apartment-view')
    }


    //example lat was 46.9171876
    //example lng was 17.8951832
    const streetViewPanoramaOptions = {
        position: { lat: coordinates.lat, lng: coordinates.lng },
        pov: { heading: 100, pitch: 0 },
        zoom: 1
    };

    if (props.isScriptLoaded && props.isScriptLoadSucceed) {
        return (
            <div>


                <div style={{
                    width: '800px',
                    height: '450px',
                    backgroundColor: '#eeeeee'
                }}>
                    <Streetview
                        apiKey={process.env.REACT_APP_GOOGLE_MAP_API}
                        streetViewPanoramaOptions={streetViewPanoramaOptions}
                    />
                </div>


                <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect}>
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <input {...getInputProps({
                                placeholder: "Enter Address ...",
                                className: 'location-search-input'
                            })} />

                            <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}

                                {suggestions.map((suggestion, key) => {
                                    const style = suggestion.active ?
                                        { backgroundColor: "#4287f5", cursor: "pointer" } :
                                        { backgroundColor: "#ffffff", cursor: "pointer" }
                                    key = suggestion.description;

                                    return (
                                        <div key={suggestion.description} {...getSuggestionItemProps(suggestion, { style })}>
                                            <span>{suggestion.description}</span>
                                        </div>
                                    )
                                })

                                }
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>

            </div>
        )
    } else {
        return (
            <div>NOT loaded</div>
        )
    }
}
export default scriptLoader([`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API}&libraries=places`])(AutoSearch);
