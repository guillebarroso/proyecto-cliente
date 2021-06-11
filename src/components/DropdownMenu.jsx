import React from 'react'
import {withRouter} from 'react-router-dom'
import {Link, Redirect} from "react-router-dom";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

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
    cookies.remove('id', { path: '/' });
    props.history.push('/login')
  }

  // function myFunction2() {
  //   console.log("funciona");
  //   var x = document.getElementById("myTopnav");
  //   if (x.className === "navbar-nav2") {
  //     x.className += "-responsive";
  //   } else {
  //     x.className = "navbar-nav2";
  //   }
  // }
  

  return (

      <div className="dropdown">
        {/* <li className="nav-item"><i className="fas fa-adjust" onClick={myFunction2}></i></li>  */}
        <Link className="menu-item" to="/profile">Mi perfil</Link>
        <Link className="menu-item" to="/myinstruments">Instrumentos</Link>
        <a href="#" className="menu-item" onClick={()=> logout()}>Cerrar sesión</a>
          
      </div>
  )
}

export default withRouter(DropdownMenu)
