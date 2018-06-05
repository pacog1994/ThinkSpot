import React from 'react'; 
import { Navigation } from './Navigation';
import Login from './Login';

export const Header = () => {
    return (
    <div>
        <Navigation/>
        <Login/>
    </div>
    )
}