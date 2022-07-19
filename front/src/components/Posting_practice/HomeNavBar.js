import React from 'react';
import {Navbar} from 'bloomer';
import { NavbarItem } from 'bloomer/lib/components/Navbar/NavbarItem';


const HomeNavBar = (props) => {
    
    return(
        <div>
            <Navbar style={{backgroundColor: "#6B9080"}}>
                <NavbarItem href='/'>Home</NavbarItem>
                <NavbarItem href='/articles'> Articles </NavbarItem>  
            </Navbar>  
        </div>    
    );
}

export default HomeNavBar;