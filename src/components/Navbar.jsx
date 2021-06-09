import React, { useEffect, useState } from "react";
import {Link, Redirect} from "react-router-dom";
import {withRouter} from 'react-router-dom'
// import Cookies from 'js-cookie';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Navbar = (props) => {

    const [user, setUser] = useState("")
    const [buscar, setBuscar] = useState("")
    const [prueba, setprueba] = useState(cookies.get('id'))
    const [open, setOpen] = useState(false);

    // function handleChange() {
    //     debugger
    //     console.log(user);
    //     console.log(buscar);
    //     props.history.push('/search/' + buscar + "/" + user)
    // }

    function myFunction() {
        console.log("funciona");
        var x = document.getElementById("myTopnav");
        if (x.className === "navbar-nav2") {
          x.className += "-responsive";
          setOpen(true)
        } else {
          x.className = "navbar-nav2";
        }
      }

    return (
        <nav className="navbar">
            <ul className="navbar-nav" >
                <li className="nav-itemm"><Link to="/"><img className="logo-header" src="/assets/img/logoSharevolume-04.png" alt="Logo Share Volume"/></Link></li>
                <li className="nav-itemm"><p className="shareVolume">Share Volume</p></li>
                <ul className="navbar-nav2" id="myTopnav">
                    {props.id === ''?
                        (<li className="nav-item"><Link to="/login" className="login-button"><i className="fas fa-user"></i>Iniciar sesión</Link></li>)
                        :(
                        <li className="nav-item"><Link to="/upload" className="login-button">Añadir productos</Link></li>
                    )}
                     
                    {/* <li className="nav-item">
                        <div className="search open">
                            <form onSubmit={handleChange}>
                                <div className="busqueda">
                                    <i class="fas fa-music" onClick={() => setUser("instrumet")}></i>
                                    <i class="fas fa-users" onClick={() => setUser("user")}></i>
                                    <input type="search" className="search-box" onChange={e => setBuscar(e.target.value)} />
                                </div>
                            </form>
                            <span className="search-button">
                                <span className="search-icon"></span>
                            </span>
                        </div>
                    </li> */}
                    <li className="nav-item">
                        <a href="#" className="dropdown-button" onClick={() => setOpen(!open)}>
                        <i className="fas fa-chevron-circle-down"></i>
                        </a>

                        {open && props.children}
                    </li>
                </ul>
                <li className="nav-item-icon" onClick={myFunction}><i class="fas fa-bars"></i></li>
            </ul>
        </nav>
    )
}

export default withRouter(Navbar)
