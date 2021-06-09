import React from 'react'
import {withRouter} from 'react-router-dom'
import {Link, Redirect} from "react-router-dom";

const DropdownMenu = (props) => {

  const logout = () => {
    debugger
    fetch('http://localhost:80/api/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    });
    props.setName("");
    props.setId("");
    props.history.push('/')
  }

  function myFunction2() {
    console.log("funciona");
    var x = document.getElementById("myTopnav");
    if (x.className === "navbar-nav2") {
      x.className += "-responsive";
    } else {
      x.className = "navbar-nav2";
    }
  }
  

  return (

      <div className="dropdown">
        <li className="nav-item"><i className="fas fa-adjust" onClick={myFunction2}></i></li> 
        <Link className="menu-item" to="/profile">Mi perfil</Link>
        <p className="menu-item">Menu</p>
        <a href="#" className="menu-item" onClick={()=> logout()}>Cerrar sesión</a>
          
      </div>
  )
}

export default withRouter(DropdownMenu)
