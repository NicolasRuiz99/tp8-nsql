import React from "react";
import {Marker,Popup} from 'react-leaflet';

const MarkerItem = ({item}) => {
    if ((item.address.coord[0]) && (item.address.coord[1])){
        return (
            <Marker position={[item.address.coord[1],item.address.coord[0]]}>
              <Popup>
                <b>{item.name}</b>
                <br/> 
                <i>{item.address.street}</i>
                <br/> 
                {item.borough}
                <br/> 
                Tipo de comida: {item.cuisine}
              </Popup>
            </Marker>
        );
    }else{
        console.log(item);
        return null
    }
    
};

export default MarkerItem;