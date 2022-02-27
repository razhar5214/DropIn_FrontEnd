import React from "react"
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import PlacesAutocomplete from 'react-places-autocomplete'
import scriptLoader from 'react-async-script-loader'



function AutoSearch(props, isScriptLoaded, isScriptLoadSucceed){
    console.log(props); 
    const [address, setAddress] = useState("");

    let navigate = useNavigate()

    const handleChange = (value) => {
        setAddress(value) 
    }
    const handleSelect = (value) => {
        setAddress(value)
        props.updateAddress(address)
        localStorage.setItem("address", value)
        navigate('/apartment-view')
    }
    if(props.isScriptLoaded && props.isScriptLoadSucceed){
        return(
            <div>
                <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect}>
                {({getInputProps, suggestions, getSuggestionItemProps, loading})=>(
                    <div>
                        <input {...getInputProps({
                            placeholder: "Enter Address ..."
                        })}/>
                    
                        <div>
                        {loading && <div>Loading...</div>}

                        {suggestions.map((suggestion, key)=>{
                            const style = suggestion.active? 
                            {backgroundColor: "#4287f5", cursor: "pointer"} : 
                            {backgroundColor: "#ffffff", cursor: "pointer"}
                            key = suggestion.description;
                            return (
                                <div {...getSuggestionItemProps(suggestion, {style})}>
                                    {suggestion.description}
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
    }else{
        return(
            <div>NOT loaded</div>
        )
    }
}
export default scriptLoader([`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API}&libraries=places`])(AutoSearch);
 