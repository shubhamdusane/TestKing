import React from 'react';
import cn  from 'classnames';
import { Link } from 'react-router-dom';



const LayoutSideBar = ({sideBarConfig}) => {

    return (
        <>
            <nav className="sidebar sidebar-offcanvas-home governance_navbar" id="sidebar">
            <ul className="nav">
                {
                    sideBarConfig.map((ele,key)=>
                    <li className={cn('nav-item menu-items', ele.customClass)}>
                    {ele.isLink ?  
                    <Link className="nav-link" >
                        <span className="menu-title">{ele.name}</span>
                    </Link>:
                    <button type="button" className="btn btn-primary btn-rounded navbar__button ml-3">{ele.name}</button>}
                </li>)
                }
 
            </ul>
        </nav>

        </>
    )
}

export default LayoutSideBar
