import React,{useState} from "react";
import { add_restaurant,alertConfirm,alertSuccess,alertError } from "../functions";
import {withRouter} from 'react-router-dom';

const AddRestaurant = ({history}) => {

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

    const addGrade = () =>{
        const item = {
            grade,
            date,
            score
        };
        setGrades(grades.concat(item));
    }

    const add = (e) => {
        e.preventDefault();
        alertConfirm ()
        .then ((res=>{
            if (res.value){
                let data = {
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
                add_restaurant (data)
                .then (res=>{
                    alertSuccess().then(()=>history.push('/'))       
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

    return (
        <div className="row">
            <div className="col">
                <div className="jumbotron">
                    <h4 className="display-4">Agregar restaurante</h4>
                    <hr className="my-4"/>
                    <form onSubmit={add} className="needs-validation" >
                    <div className="form-group">
                        <label>Nombre del local *</label>
                        <input type="text" className="form-control" placeholder="Ingrese nombre" onChange={e=>setName(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label>Tipo de comida *</label>
                        <input type="text" className="form-control" placeholder="Ingrese el tipo de comida que se cocina" onChange={e=>setCuisine(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label>Localidad *</label>
                        <input type="text" className="form-control"placeholder="Ingrese la localidad del negocio" onChange={e=>setBorough(e.target.value)} required/>
                    </div>
                    <h1 className="display-5">Dirección</h1>
                    <div className="form-group">
                        <label>Coordenadas *</label>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Latitud" onChange={e=>setLat(e.target.value)} required/>
                            <span className="input-group-addon"></span>
                            <input type="text" className="form-control" placeholder="Longitud" onChange={e=>setLon(e.target.value)} required/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Calle *</label>
                        <input type="text" className="form-control"placeholder="Calle y número del local" onChange={e=>setStreet(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label>Código postal *</label>
                        <input type="number" min="0" className="form-control"placeholder="Código postal de la localidad" onChange={e=>setZipcode(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label>Edificio</label>
                        <input type="number" min="0" className="form-control"placeholder="Número de edificio" onChange={e=>setBuilding(e.target.value)}/>
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
                    <button type="submit" className="btn btn-primary">Agregar restaurante</button>
                    </form>
                </div>
            </div>
            <div className="col">
            </div>
        </div>
        );
};

export default withRouter (AddRestaurant);