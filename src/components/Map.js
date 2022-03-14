import React from 'react'
import {GoogleMap, Marker} from 'react-google-maps'

export default function Map(){
    return(
        <GoogleMap
            defaultZoom={17}
            defaultCenter={{    lat: JSON.parse(localStorage.getItem("lat")), 
                                lng: JSON.parse(localStorage.getItem("lng"))
                        }}
        >
            <Marker position={{     lat: JSON.parse(localStorage.getItem("lat")), 
                                    lng: JSON.parse(localStorage.getItem("lng"))
                            }}/>
        </GoogleMap>
    );
}
