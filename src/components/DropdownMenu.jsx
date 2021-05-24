import React from 'react'

const DropdownMenu = (props) => {

    function DropdownItem(props) {
        return (
          <a href="#" className="menu-item">
            {props.children}
          </a>
        );
      }

    return (

        <div className="dropdown">
            <DropdownItem>Menu</DropdownItem>
            <DropdownItem>Menu</DropdownItem>
            <DropdownItem>Menu</DropdownItem>
            
        </div>
    )
}

export default DropdownMenu
