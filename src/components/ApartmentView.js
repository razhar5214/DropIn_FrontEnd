import React from 'react'
import { useState } from 'react'
import BackgroundImage from '../images/map-of-nyc.png'

export default function ApartmentView(props) {

    return (
        <div className='apt-view-page'>
            <h1>hello world + {props.address}</h1>

            <div className='apartment-intro'>
                {/* image of apt building and a map */}
            </div>

        </div>
    )
}