import React,{useEffect,useState} from "react";
import {Marker,Popup} from 'react-leaflet';
import {greenIcon,blueIcon,goldIcon,redIcon,violetIcon,blackIcon} from '../leafletIcons';
import {withRouter,Link} from 'react-router-dom';

const MarkerItem = ({item}) => {

//asignamos un color a un tipo de comida, si no, se asigna el azul

    const [icon,setIcon] = useState (blueIcon);

    useEffect (()=>{
      switch (item.cuisine){
        case "American":
          setIcon (goldIcon);
          break;
        case "Irish":
          setIcon (greenIcon);
          break;
        case "Chinese":
          setIcon (redIcon);
          break;
        case "Hamburgers":
          setIcon (violetIcon);
          break;
        case "Pizza":
            setIcon (blackIcon);
            break;
        default:
          setIcon (blueIcon);
          break;
      }
    },[])

    if ((item.address.coord[0]) && (item.address.coord[1])){
        return (
            <Marker position={[item.address.coord[1],item.address.coord[0]]} icon={icon} >
              <Popup>
                <b>{item.name}</b>
                <br/> 
                <i>{item.address.street}</i>
                <br/> 
                {item.borough}
                <br/> 
                Tipo de comida: {item.cuisine}
                <br/> 
                <Link type="button" to={`/restaurant/${item.id}`} >Ver detalles</Link>
              </Popup>
            </Marker>
        );
    }else{
        console.log(item);
        return null
    }
    
};

export default withRouter (MarkerItem);