import React, { Component } from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
} from 'react-google-maps';
import axios from 'axios';

const { compose, withProps, withStateHandlers } = require('recompose');
const ngrokAllPlants = 'https://674a789d.ngrok.io/api/plants';
const img = require('../../assets/bilj80.png');

let stajl = [
    {
        elementType: 'labels',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    },
    {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    },
    {
        featureType: 'administrative.land_parcel',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    },
    {
        featureType: 'administrative.neighborhood',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    },
    {
        featureType: 'poi',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry.fill',
        stylers: [
            {
                visibility: 'on'
            }
        ]
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text',
        stylers: [
            {
                visibility: 'on'
            }
        ]
    },
    {
        featureType: 'road',
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    },
    {
        featureType: 'transit',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    }
];

const MapWithAMarker = compose(
    withStateHandlers(
        () => ({
            isOpen: false
        }),
        {
            onToggleOpen: ({ isOpen }) => () => ({
                isOpen: !isOpen
            })
        }
    ),
    withScriptjs,
    withGoogleMap
)(props => (
    <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 44.786, lng: 20.448 }}
        defaultOptions={{ styles: stajl }}
    >
        <Marker
            defaultIcon={img}
            position={{ lat: 44.8532094, lng: 20.3555646 }}
            onClick={props.onToggleOpen}
        >
            {props.isOpen && (
                <InfoWindow onCloseClick={props.onToggleOpen}>
                    <div>
                        <div>
                            <strong>Plant name </strong>: Lucy
                        </div>
                        <div>
                            <strong>Specy </strong>: Anglaonema
                        </div>
                        <div>
                            <strong>Age </strong>: 7 months old.
                        </div>
                    </div>
                </InfoWindow>
            )}
        </Marker>
        <Marker
            defaultIcon={img}
            position={{ lat: 44.7902717, lng: 20.46634 }}
            onClick={props.onToggleOpen}
        />
        <Marker
            defaultIcon={img}
            position={{ lat: 44.8047258, lng: 20.4671618 }}
        />
        <Marker
            defaultIcon={img}
            position={{ lat: 44.8072274, lng: 20.4635488 }}
        />
        <Marker
            defaultIcon={img}
            position={{ lat: 44.812037, lng: 20.4582228 }}
        />
        <Marker
            defaultIcon={img}
            position={{ lat: 44.7851947, lng: 20.5387568 }}
        />
    </GoogleMap>
));

export class GMap extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <MapWithAMarker
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={
                    <div style={{ height: `100%`, width: `100%` }} />
                }
                mapElement={<div style={{ height: `100%` }} />}
            />
        );
    }
}

export default GMap;
