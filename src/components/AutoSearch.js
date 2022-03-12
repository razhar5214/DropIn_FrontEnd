import React, { useEffect } from "react"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import scriptLoader from 'react-async-script-loader'


function AutoSearch(props, isScriptLoaded, isScriptLoadSucceed) {
    console.log('AutoSearch Props: ',props);
    
    let navigate = useNavigate()

    const [address, setAddress] = useState("");

    const [userInput, setUserInput] = useState("");

    const [coordinates, setCoordinates] = useState({
        lat: null,
        lng: null,
    });


    useEffect(() => {
            props.updateAddress(address)
            props.updateCoordinates(coordinates)
    }, [address])


    const handleChange = (value) => {
        setUserInput(value)
    }

    const handleSelect = async (value) => {
        console.log('in handleSelect', address)
        console.log('in handleSelect', coordinates)

        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);

        setCoordinates(prevCoords => ({
            ...prevCoords,
            lat: latLng.lat,
            lng: latLng.lng
        }));
        setUserInput(value)
        setAddress(...address, address => value)
        props.updateAddress(address)
        props.updateCoordinates(coordinates)
        localStorage.setItem("address", value)
        localStorage.setItem("lat", JSON.stringify(latLng.lat))
        localStorage.setItem("lng", JSON.stringify(latLng.lng))
        navigate('/apartment-view')
    }

    if (props.isScriptLoaded && props.isScriptLoadSucceed) {
        return (
            <div>

                <PlacesAutocomplete value={userInput} onChange={handleChange} onSelect={handleSelect}>
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
