import React, {useState } from "react";
import {Link, Redirect} from "react-router-dom";

const Navbar = (props) => {

    const [open, setOpen] = useState(false)
    const [buscar, setBuscar] = useState("")

    const logout = async () => {
        debugger
        await fetch('http://localhost:80/api/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
        props.setName("")

    }

    function handleChange() {
        debugger
        console.log(buscar);
        <Redirect
        to={{
            pathname: "/prueba",
            search: "?utm=your+face",
        }}
        />
      }
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li className="nav-item"><Link to="/"><img className="logo-header" src="assets/img/logoSharevolume-04.png" alt="Logo Share Volume"/></Link></li>
                <li className="nav-item"><p className="shareVolume">Share Volume</p></li>
                <li className="nav-item"><button className="login-button"><i class="fas fa-user"></i>Inicia sesión o regístrate</button></li>
                <li className="nav-item"><i className="fas fa-adjust" onclick="darkmode()"></i></li>
                <li className="nav-item">
                    <div class={open?"search open":"search"}>
                        {open && (<form onSubmit={handleChange}><input type="search" class="search-box" onChange={e => setBuscar(e.target.value)} /></form>)}
                        <span class="search-button" onClick={() => setOpen(!open)}>
                            <span class="search-icon"></span>
                        </span>
                    </div>
                </li>
                {props.children}
            </ul>
        </nav>
        
        // <header className="menu">
        //     <div className="contenedor">
        //         <Link to="/"><img className="logo-header" src="assets/img/logoSharevolume-04.png" alt="logo Share Volume"/></Link>
        //         <p className="shareVolume">SHARE VOLUME {props.name}</p>
        //         <div className="menuResponsive"><i className="fas fa-bars"></i></div>
        //         <div>
        //         {props.name ?(
        //             <div>
        //                 <Link to="/upload"><div className="botones">
        //                     <p>Añadir producto</p></div>
        //                 </Link> 
        //                 <Link to="/login" className="nav-link" onClick={logout}>Logout</Link>
        //             </div>
        //         )                
        //         : (<Link to="/login"><div className="botones">
        //                 <p>Iniciar Sesión / Regístrate</p></div>
        //             </Link>
                
        //         )}
        //                 <a href="#"><i className="fas fa-search"></i></a>
        //                 {props.name ?(
        //                 <div className="iconos-menu">
        //                     <a href="#"><i className="fas fa-bell"></i></a>
        //                     <a href="#"><i className="fas fa-comment-alt"></i></a>
        //                     <i className="fas fa-adjust" onClick="darkmode()"></i>
        //                     <div></div>
        //                 </div>):""}         
        //         </div>
        //     </div>
        // </header>
    )
}

export default Navbar
