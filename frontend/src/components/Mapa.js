import React,{Fragment,useState,useEffect} from "react";
import {Map,TileLayer} from 'react-leaflet';
import './../app.css';
import { list_restaurants, alertError } from "../functions";
import MarkerList from "./MarkerList";

const Mapa = ({search,searchClick,setSearchClick}) => {

    const [lat,setLat] = useState (0);
    const [ln,setLn] = useState (0);
    const [zoom,setZoom] = useState (0);
    const [restaurants,setRestaurants] = useState ([]);
    const [currentRestaurants,setCurrentRestaurants] = useState ([]);
    const [loading,setLoading] = useState (false);

    useEffect(()=>{
      if (searchClick === true){
        if (search === ""){  
          setCurrentRestaurants (restaurants);
        }else{
          setCurrentRestaurants (restaurants.filter((item)=> item.cuisine.toLowerCase().includes(search.toLowerCase()))); 
        }
        setSearchClick (false);
      }
    },[searchClick])

    useEffect (()=>{
        setLat (40.730610);
        setLn (-73.935242);
        setZoom (4);
        setLoading (true);
        list_restaurants ()
        .then (res=>{
          setRestaurants (res);
          setCurrentRestaurants (res);
          setLoading (false);
        })
        .catch (err=>{
          setLoading (false);
          alertError ();
          return;
        })
    },[])

    return (
      <Fragment>
        {(loading)?
        <h2>cargando...</h2>
        :
        <Map center={[lat,ln]} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <MarkerList list={currentRestaurants} />
      </Map>
        }
      </Fragment>
    );
};

export default Mapa;