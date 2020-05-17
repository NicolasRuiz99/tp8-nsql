import React from "react";
import {Link,withRouter} from 'react-router-dom';

const Navbar = ({setSearch,setSearchClick,search}) => {
    return (
        <div className="navbar navbar-expand-lg navbar-dark bg-primary">
            <Link className="navbar-brand" to="/"><img width="60" height="60" src={require('../logo.png')} /></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/add">Agregar restaurante</Link>
                </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">    
                <div class="input-group mb-3">
                    <input className="form-control mr-sm-2" type="text" placeholder="Filtrar por tipo de comida" onChange={e=>setSearch(e.target.value)}/>
                    <button className="btn btn-secondary my-2 my-sm-0" type="button" onClick={()=>setSearchClick(true)}>Filtrar</button>
                </div>     
                </form>
            </div>
        </div>
    );
};

export default withRouter (Navbar);