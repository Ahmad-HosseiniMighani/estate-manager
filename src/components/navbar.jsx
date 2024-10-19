import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavItem from './common/navItem';

class NavBar extends Component {
    state = {  }
    render() { 
        const {isLoggedIn} = this.props;
        return ( 
            <header className="top-navbar mt-5 shadow">
                <nav className="navbar navbar-expand-lg py-0">
                    <div className="container-fluid p-0">
                        <Link className="navbar-brand ms-4" to="/">مشاور املاک اسلامی</Link>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <button className="navbar-toggler p-2 px-3 m-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <i className="fas fa-times"></i>
                            </button>
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0" dir="rtl">
                                <NavItem 
                                    exact={true}
                                    to="/"
                                    title={"خانه"}
                                    icon={"fas fa-home ps-1"}
                                />
                                <li class="nav-item"><a aria-current="page" class="nav-link" href="#contact-us">تماس با ما</a></li>
                                {isLoggedIn && (<React.Fragment>
                                    <NavItem 
                                        exact={true}
                                        to="/manage-properties"
                                        title={"مدیریت املاک"}
                                    />
                                    <NavItem 
                                        exact={true}
                                        to="/manage-area"
                                        title={"مدیریت منطقه ها"}
                                    />
                                    <NavItem 
                                        exact={true}
                                        to="/manage-notifications"
                                        title={"مدیریت اعلان ها"}
                                    />
                                    <NavItem 
                                        exact={true}
                                        to="/logout"
                                        title={"خروج"}
                                    />
                                </React.Fragment>)}
                            </ul>
                        </div>
                        <button className="navbar-toggler me-4 my-2 py-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-bars"></i>
                        </button>
                    </div>
                </nav>
            </header>
           );
    }
}
 
export default NavBar;