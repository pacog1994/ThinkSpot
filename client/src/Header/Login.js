import React, { Component } from 'react'   
import { connect } from 'react-redux'
import { login, logout } from '../_actions'
import { bindActionCreators } from 'redux';

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            response: [],
            first_name: this.props.user.first_name   
        }
        this.logIn = this.logIn.bind(this)
        this.logOut = this.logOut.bind(this)
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

    logIn = (e) => {
        e.preventDefault()
        // console.log(`
        //     first name: ${this.props.user.first_name}
        //     last name: ${this.props.user.last_name}
        //     username: ${this.props.user.username}
        // `)
        const user = this.state.response.find((user) => {
            return this.refs.username.value === user.username 
            && this.refs.password.value === user.password
        })     

        
        return user ? this.setState({first_name: user.first_name}, () => {
           console.log("logged in")
           this.props.login(null)
        })
        : console.log("Username or password is incorrect")
    }

    logOut = (e) => {
        e.preventDefault();
        this.setState({first_name: null}, () => {
            console.log("logged out")
            this.props.logout()
        })
    }
    render() {
        
        const loggedIn = JSON.parse(localStorage.getItem('user'))
        .user.username !== null

        return (
            <div>
                { !loggedIn ? 
                <form className="logIn" onSubmit={this.logIn}>
                    <label htmlFor="username">
                        Username: 
                        <input type="text" 
                            name="username"
                            required
                            ref="username"
                        />
                    </label>
                    <br></br>
                    <label htmlFor="password">
                        Password:
                        <input type="text" 
                            name="password"
                            required
                            ref="password"
                        />
                    </label>
                    <br></br>
                    <input type="submit" value="Sign In"/>
                </form>
                
                :
                
                <div>
                    <h2> Welcome {this.state.first_name}</h2>
                    <button onClick={this.logOut}>Log Out</button>
                </div>    
              }
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
        login: login,
        logout: logout
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
