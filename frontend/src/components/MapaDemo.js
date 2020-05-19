import React,{Fragment} from "react";
import {Map,TileLayer,Marker,Popup} from 'react-leaflet';
import './../app.css';
import {markers} from "../utils/markers";
import MarkerClusterGroup from "react-leaflet-markercluster";

const MapaDemo = () => {
    return (
        <Fragment>
          <Map center={[10.0, 5.0]} zoom={2} minZoom={2}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          <MarkerClusterGroup>
            {markers.map((item)=>(
                <Marker position={[item.lat,item.lng]}>
                <Popup>
                    <b>{item.name}</b>
                    <br/> 
                    {item.city}
                    <br/> 
                    <b>IATA/FAA:</b>{item.iata_faa}
                    <br/> 
                    <b>ICAO:</b>{item.icao}
                    <br/> 
                    <b>Altitude:</b>{`${Math.round(item.alt * 0.3048 )} m`}
                    <br/> 
                    <b>Timezone:</b>{item.tz}
                    <br/> 
                </Popup>
                </Marker>
            ))}
          </MarkerClusterGroup>
        </Map>
        </Fragment>
      );
};

export default MapaDemo;