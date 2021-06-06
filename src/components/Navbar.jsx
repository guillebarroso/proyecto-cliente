import React, {useState } from "react";
import {Link, Redirect} from "react-router-dom";
import {withRouter} from 'react-router-dom'

const Navbar = (props) => {

    const [open, setOpen] = useState(false)
    const [user, setUser] = useState("")
    const [buscar, setBuscar] = useState("")

    function handleChange() {
        debugger
        console.log(user);
        console.log(buscar);
        props.history.push('/search/' + buscar + "/" + user)
      }
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li className="nav-item"><Link to="/"><img className="logo-header" src="/assets/img/logoSharevolume-04.png" alt="Logo Share Volume"/></Link></li>
                <li className="nav-item"><p className="shareVolume">Share Volume</p></li>
                <li className="nav-item"><Link to="/login" className="login-button"><i className="fas fa-user"></i>Inicia sesión o regístrate</Link></li>
                <li className="nav-item"><i className="fas fa-adjust"></i></li>  
                {/* Arriba va esto onClick="darkmode()" */}
                <li className="nav-item">
                    <div className={open?"search open":"search"}>
                        {open && (                        
                        <form onSubmit={handleChange}>
                            <div className="busqueda">
                                <i class="fas fa-music" onClick={() => setUser("instrumet")}></i>
                                <i class="fas fa-users" onClick={() => setUser("user")}></i>
                                <input type="search" className="search-box" onChange={e => setBuscar(e.target.value)} />
                            </div>
                        </form>
                        )}
                        <span className="search-button" onClick={() => setOpen(!open)}>
                            <span className="search-icon"></span>
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

export default withRouter(Navbar)
