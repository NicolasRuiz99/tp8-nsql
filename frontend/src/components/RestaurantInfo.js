import React,{useState,useEffect,Fragment} from "react"
import { modify_restaurant, get_restaurant, alertError, delete_restaurant,alertConfirm,alertSuccess } from "../utils/functions";
import {withRouter} from 'react-router-dom';

const RestaurantInfo = ({id,history}) => {

    const [grade,setGrade] = useState ("");
    const [date,setDate] = useState ("");
    const [score,setScore] = useState (0);

    const [grades,setGrades] = useState ([]);
    const [name,setName] = useState ("");
    const [cuisine,setCuisine] = useState ("");
    const [borough,setBorough] = useState ("");
    const [lat,setLat] = useState (0);
    const [lon,setLon] = useState (0);
    const [street,setStreet] = useState ("");
    const [zipcode,setZipcode] = useState ("");
    const [building,setBuilding] = useState ("");
    const [loading,setLoading] = useState (false);

    const addGrade = () =>{
        const item = {
            grade,
            date,
            score
        };
        setGrades(grades.concat(item));
    }

    const modify = (e) => {
        e.preventDefault();
        alertConfirm ()
        .then ((res=>{
            if (res.value){
                let data = {
                    id,
                    name,
                    borough,
                    cuisine,
                    grades,
                    address:{
                        building,
                        street,
                        zipcode,
                        coord:[lon,lat]
                    }
                }          
                modify_restaurant (data)
                .then (res=>{
                    alertSuccess()      
                    return;
                })
                .catch (err=>{               
                    alertError();
                    return;
                })
            }else{
                return;
            }
        }))
    }

    const deleteItem = () => {
        alertConfirm ()
        .then ((res=>{
            if (res.value){       
                delete_restaurant (id)
                .then (res=>{
                    alertSuccess()
                    .then (()=>history.push('/'))        
                    return;
                })
                .catch (err=>{   
                    console.log(err);
                             
                    alertError();
                    return;
                })
            }else{
                return;
            }
        }))
    }

    useEffect(() => {
        setLoading (true);
        get_restaurant (id)
        .then (res=>{
            setGrades (res.grades);
            setName (res.name);
            setCuisine (res.cuisine);
            setBorough (res.borough);
            setLon (res.address.coord[0]);
            setLat (res.address.coord[1]);
            setStreet (res.address.street);
            setZipcode (res.address.zipcode);
            setBuilding (res.address.building);
            setLoading (false);
        })
        .catch (err=>{
            setLoading (false);
            alertError ();
            return;
        })
    }, [id]);

    return (
        <Fragment>
            {(loading)?
            <h2>cargando...</h2>
            :
            <div className="row">
                <div className="col">
                    <div className="jumbotron">
                        <h4 className="display-4">Información del restaurante</h4>
                        <hr className="my-4"/>
                        <form onSubmit={modify} className="needs-validation" >
                        <div className="form-group">
                            <label>Nombre del local *</label>
                            <input type="text" className="form-control" placeholder="Ingrese nombre" defaultValue={name} onChange={e=>setName(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <label>Tipo de comida *</label>
                            <input type="text" className="form-control" placeholder="Ingrese el tipo de comida que se cocina" defaultValue={cuisine} onChange={e=>setCuisine(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <label>Localidad *</label>
                            <input type="text" className="form-control"placeholder="Ingrese la localidad del negocio" defaultValue={borough} onChange={e=>setBorough(e.target.value)} required/>
                        </div>
                        <h1 className="display-5">Dirección</h1>
                        <div className="form-group">
                            <label>Coordenadas *</label>
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Latitud" defaultValue={lat} onChange={e=>setLat(e.target.value)} required/>
                                <span className="input-group-addon"></span>
                                <input type="text" className="form-control" placeholder="Longitud" defaultValue={lon} onChange={e=>setLon(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Calle *</label>
                            <input type="text" className="form-control"placeholder="Calle y número del local" defaultValue={street} onChange={e=>setStreet(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <label>Código postal *</label>
                            <input type="number" min="0" className="form-control"placeholder="Código postal de la localidad" defaultValue={zipcode} onChange={e=>setZipcode(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <label>Edificio</label>
                            <input type="number" min="0" className="form-control"placeholder="Número de edificio" defaultValue={building} onChange={e=>setBuilding(e.target.value)}/>
                        </div>
                        <h1 className="display-5">Opiniones</h1>
                        <div className="form-group">
                            <label>Agregar opinión a la lista</label>
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Grado" onChange={e=>setGrade(e.target.value)}/>
                                <span className="input-group-addon"></span>
                                <input type="number" min="0" className="form-control" placeholder="Puntuación" onChange={e=>setScore(e.target.value)}/>
                                <span className="input-group-addon"></span>
                                <input type="date" className="form-control" onChange={e=>setDate(e.target.value)}/>
                                <span className="input-group-addon"></span>
                                <button type="button" className="btn btn-primary" onClick={()=>addGrade()} >Agregar</button>
                                <button type="button" className="btn btn-danger" onClick={()=>setGrades([])} >Vaciar lista</button>
                            </div>
                        </div>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                <th scope="col">Grado</th>
                                <th scope="col">Puntuación</th>
                                <th scope="col">Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {grades.map((item)=>(
                                    <tr>
                                    <th>{item.grade}</th>
                                    <td>{item.score}</td>
                                    <td>{item.date}</td>
                                    </tr>
                                ))}     
                            </tbody>
                        </table>
                        <p className="text-danger">(*) Campos obligatorios</p>
                        <button type="submit" className="btn btn-primary">Modificar</button>
                        <button type="button" className="btn btn-danger" onClick={()=>deleteItem()} >Eliminar</button>
                        </form>
                    </div>
                </div>
                <div className="col"></div>
            </div>
            }
        </Fragment>
        );
};

export default withRouter (RestaurantInfo);