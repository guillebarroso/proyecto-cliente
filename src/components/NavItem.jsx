import React, {useState} from 'react';

const NavItem = (props) => {
    const [open, setOpen] = useState(false);
    return (
    <li className="nav-item">
        <a href="#" className="dropdown-button" onClick={() => setOpen(!open)}>
        <i class="fas fa-chevron-circle-down"></i>
        </a>

        {open && props.children}
    </li>
    )
}

export default NavItem
