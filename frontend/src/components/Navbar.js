import React from "react";
import {Link,withRouter} from 'react-router-dom';

const Navbar = () => {
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
                <li className="nav-item">
                    <Link className="nav-link" to="/about">About</Link>
                </li>
                </ul>
            </div>
        </div>
    );
};

export default withRouter (Navbar);