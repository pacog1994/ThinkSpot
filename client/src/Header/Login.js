import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'

import { login, getSpot } from '../_actions'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            first_name: "" 
        }
        this.logIn = this.logIn.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onChange = name => e => {
        this.setState({
            [name]: e.target.value
        })
    }

    logIn = (e) => {
        e.preventDefault()    

        const user = this.props.users.find((user) => {
            return this.state.username === user.username 
            && this.state.password === user.password
        })    

        return user ? this.setState({first_name: user.first_name}, () => {
           this.props.login(user.first_name, user.last_name, user.username)
           this.props.getSpot(user.username)
           this.props.history.push('/')
        }) : console.log("Username or password is incorrect")
    }

    render() {
        return (   
            <div>
                <Card>
                <CardHeader
                    title="Login"
                    subtitle="test"
                />
                    <form className="logIn" onSubmit={this.logIn} style={{padding: "20px"}}>
                        <TextField 
                            label="Username"
                            type="text"
                            value={this.state.username}
                            onChange={this.onChange("username")}
                            required
                        />
                        <br></br>
                        <TextField 
                            label="Password"
                            type="password" 
                            value={this.state.password}
                            onChange={this.onChange("password")}
                            required
                        />
                        <br></br>
                        <br></br> 
                        <Button type="submit" variant="contained" size="small" color="primary">Sign In</Button>
                    </form>
                </Card>
            </div>
        )
    }
}

Login.propTypes = { 
    login: PropTypes.func.isRequired,
    getSpot: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    errors: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
    return {
        users: state.db.users,
        errors: state.errors
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        login: login,
        getSpot: getSpot
    }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
