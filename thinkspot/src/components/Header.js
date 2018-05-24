import React from 'react'; 
import { NavLink } from 'react-router-dom';

export const Header = () => {
    return (
    <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="About">About</NavLink>
        <NavLink to="Browse">Browse</NavLink>
        <NavLink to="Contact Us">Contact Us</NavLink>
    </div>
    )
}