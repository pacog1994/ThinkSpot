/**
 * Home page
 */
import React from 'react'
import {Link} from 'react-router-dom'

export const Home = () => (
    <div>
        <Link to="/create">Create a Spot!</Link>
    </div>
)