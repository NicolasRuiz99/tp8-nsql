import React,{useState} from "react";
import { add_restaurant,alertConfirm,alertSuccess,alertError } from "../functions";

const AddRestaurant = () => {

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
                    alertSuccess();
                    console.log(res);           
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

    return (
        <div class="jumbotron">
            <h4 class="display-4">Agregar restaurante</h4>
            <hr class="my-4"/>
            <form onSubmit={add} className="needs-validation" >
            <div class="form-group">
                <label>Nombre del local *</label>
                <input type="text" class="form-control" placeholder="Ingrese nombre" onChange={e=>setName(e.target.value)} required/>
            </div>
            <div class="form-group">
                <label>Tipo de comida *</label>
                <input type="text" class="form-control" placeholder="Ingrese el tipo de comida que se cocina" onChange={e=>setCuisine(e.target.value)} required/>
            </div>
            <div class="form-group">
                <label>Localidad *</label>
                <input type="text" class="form-control"placeholder="Ingrese la localidad del negocio" onChange={e=>setBorough(e.target.value)} required/>
            </div>
            <h1 class="display-5">Dirección</h1>
            <div class="form-group">
                <label>Coordenadas *</label>
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Latitud" onChange={e=>setLat(e.target.value)} required/>
                    <span class="input-group-addon"></span>
                    <input type="text" class="form-control" placeholder="Longitud" onChange={e=>setLon(e.target.value)} required/>
                </div>
            </div>
            <div class="form-group">
                <label>Calle *</label>
                <input type="text" class="form-control"placeholder="Calle y número del local" onChange={e=>setStreet(e.target.value)} required/>
            </div>
            <div class="form-group">
                <label>Código postal *</label>
                <input type="number" min="0" class="form-control"placeholder="Código postal de la localidad" onChange={e=>setZipcode(e.target.value)} required/>
            </div>
            <div class="form-group">
                <label>Edificio</label>
                <input type="number" min="0" class="form-control"placeholder="Número de edificio" onChange={e=>setBuilding(e.target.value)}/>
            </div>
            <h1 class="display-5">Opiniones</h1>
            <div class="form-group">
                <label>Agregar opinión a la lista</label>
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Grado" onChange={e=>setGrade(e.target.value)}/>
                    <span class="input-group-addon"></span>
                    <input type="number" min="0" class="form-control" placeholder="Puntuación" onChange={e=>setScore(e.target.value)}/>
                    <span class="input-group-addon"></span>
                    <input type="date" class="form-control" onChange={e=>setDate(e.target.value)}/>
                    <span class="input-group-addon"></span>
                    <button type="button" class="btn btn-primary" onClick={()=>addGrade()} >Agregar</button>
                    <button type="button" class="btn btn-danger" onClick={()=>setGrades([])} >Vaciar lista</button>
                </div>
            </div>
            <table class="table table-hover">
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
            <p class="text-danger">(*) Campos obligatorios</p>
            <button type="submit" class="btn btn-primary">Agregar restaurante</button>
            </form>
        </div>
        );
};

export default AddRestaurant;