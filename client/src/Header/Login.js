import React, { Component } from 'react'   
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login } from '../_actions'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            response: [],
            username: "",
            password: "",
            first_name: "" 
        }
        this.logIn = this.logIn.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.callApi()
        .then(res => this.setState({ response: res.Users }))
        .catch(err => console.log(err))
    }

    callApi = async() => {
        const response = await fetch("/*")
        const body = await response.json()
        if (response.status !== 200) throw Error(body.message)
        return body
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
        
    }

    logIn = (e) => {
        e.preventDefault()
            
        console.log(`
                state:

                username: ${this.state.username}
                password: ${this.state.password}
            `)

        const user = this.state.response.find((user) => {
            console.log(user.username + " " + user.password)
            return this.state.username === user.username 
            && this.state.password === user.password
        })     

        
        return user ? this.setState({first_name: user.first_name}, () => {
           console.log("logged in")
           this.props.login(user.first_name, user.last_name, user.username)
           window.location = '/'

        })
        : console.log("Username or password is incorrect")
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
                            onChange={this.handleChange("username")}
                            required
                        />
                        <br></br>
                        <TextField 
                            label="Password"
                            type="password" 
                            value={this.state.password}
                            onChange={this.handleChange("password")}
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


const mapStateToProps = (state) => {
    return {
        user: state.user,
        errors: state.errors
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        login: login
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
