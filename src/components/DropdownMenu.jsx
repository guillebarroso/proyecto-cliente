import React from 'react'

const DropdownMenu = (props) => {

  const logout = () => {
    debugger
    fetch('http://localhost:80/api/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    });
    props.setName("")

  }

  return (

      <div className="dropdown">
          <p className="menu-item">Menu</p>
          <p className="menu-item">Menu</p>
          <a href="#" className="menu-item" onClick={()=> logout()}>Cerrar sesión</a>
          
      </div>
  )
}

export default DropdownMenu
