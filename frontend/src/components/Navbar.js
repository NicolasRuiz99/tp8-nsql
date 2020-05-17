import React from "react";
import {Link,withRouter} from 'react-router-dom';

const Navbar = ({search,setSearch}) => {
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
                    <Link className="nav-link" to="#">Agregar restaurante</Link>
                </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="text" placeholder="Filtrar por tipo de comida" defaultValue={search} onChange={e=>setSearch(e.target.value)}/>
                </form>
            </div>
        </div>
    );
};

export default withRouter (Navbar);