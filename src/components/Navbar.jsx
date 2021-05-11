import React from 'react'
import {Link} from "react-router-dom";

const Navbar = (props) => {
    const logout = async () => {
        debugger
        await fetch('http://localhost:80/api/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
        props.setName("")

    }
    return (
        <header className="menu">
            <div className="contenedor">
                <Link to="/"><img class="logo-header" src="assets/img/logoSharevolume-04.png" alt="logo Share Volume"/></Link>
                <p className="shareVolume">SHARE VOLUME {props.name}</p>
                <div className="menuResponsive"><i className="fas fa-bars"></i></div>
                <div>
                {props.name ?(
                    <div>
                        <Link to="/upload"><div className="botones">
                            <p>Añadir producto</p></div>
                        </Link> 
                        <Link to="/login" className="nav-link" onClick={logout}>Logout</Link>
                    </div>
                )                
                : (<Link to="/login"><div className="botones">
                        <p>Iniciar Sesión / Regístrate</p></div>
                    </Link>
                
                )}
                        <a href="#"><i className="fas fa-search"></i></a>
                        {props.name ?(
                        <div className="iconos-menu">
                            <a href="#"><i className="fas fa-bell"></i></a>
                            <a href="#"><i className="fas fa-comment-alt"></i></a>
                            <i className="fas fa-adjust" onClick="darkmode()"></i>
                            <div></div>
                        </div>):""}         
                </div>
            </div>
        </header>
    )
}

export default Navbar
