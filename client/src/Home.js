/**
 * Home page
 */
import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'

export const Home = () => (
    <div style={{textAlign: "center", marginTop: 50, height: 100}}>
        <Link to="/spot/add" style={{textDecoration: "none"}}>
            <Button variant="outlined" color="primary">Create a Spot!</Button>
        </Link>
    </div>
)
