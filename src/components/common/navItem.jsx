import { NavLink } from "react-router-dom";

const NavItem = ({title,icon,...rest}) => {
    return ( 
        <li className="nav-item">
            <NavLink className="nav-link" {...rest}>
                {icon && (<i className={icon}></i>)}
                {title}</NavLink>
        </li>
     );
}
 
export default NavItem;