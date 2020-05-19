import React,{Fragment,useState,useEffect} from "react";
import {Map,TileLayer} from 'react-leaflet';
import './../app.css';
import { list_restaurants, alertError, list_categories, list_restaurants_type } from "../utils/functions";
import MarkerList from "./MarkerList";

const Mapa = () => {

    const [search,setSearch] = useState ("");
    const [lastSearch,setLastSearch] = useState ("");
    
    const [categories,setCategories] = useState ([])
    const [restaurants,setRestaurants] = useState ([]);
    const [currentRestaurants,setCurrentRestaurants] = useState ([]);
    const [loading,setLoading] = useState (false);

    useEffect(()=>{
        if (search === ""){  
          setCurrentRestaurants (restaurants);
          setLastSearch (search)
        }else{
          setLoading (true);
          list_restaurants_type (search)
          .then (res=>{
            setCurrentRestaurants (res);
            setLastSearch (search)
            setLoading (false);
          })
          .catch (err=>{
            setLoading (false);
            alertError ();
          })
        }
    },[search])

    useEffect (()=>{
        setLoading (true);
        list_restaurants ()
        .then (res=>{
          setRestaurants (res);
          setCurrentRestaurants (res);
          list_categories ()
          .then (res=>{
            setCategories (res);
            setLoading (false);
          })
          .catch (err=>{
            setLoading (false);
            alertError ();
          })
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
        <div>
            <div class="input-group">
              <div class="input-group-append">
                <span class="input-group-text">Filtrar por tipo de comida</span>
              </div>
              <select class="custom-select" onChange={(e)=>setSearch(e.target.value)} defaultValue={lastSearch}>
                <option value="">Todas las categorías</option>
                {categories.map((item)=>(
                    <option value={item}>{item}</option>
                ))}
              </select>
            </div>
        <Map center={[40.730610,-73.935242]} zoom={4} minZoom={2} preferCanvas={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <MarkerList list={currentRestaurants} />
        </Map>
        </div>
        }
      </Fragment>
    );
};

export default Mapa;