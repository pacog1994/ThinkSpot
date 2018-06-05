import React, { Component } from 'react';   
import { Users } from '../../models/Users';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: '',
            loggedIn: false,
            first_name: null
        }
        this.logIn = this.logIn.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({response : JSON.stringify(res.Users[0].first_name)}))
            .catch(err => console.log(err));
    } 

    callApi = async() => {
        const response = await fetch('/*');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    logIn = (e) => {
        e.preventDefault();
        const user = Users.find((user) => {
            return this.refs.username.value === user.username 
            && this.refs.password.value === user.password; 
        })     
        return user ? this.setState({loggedIn: true, first_name: user.first_name}) 
        : console.log("Username or password is incorrect");  
    }

    logOut = (e) => {
        e.preventDefault();
        this.setState({loggedIn: false, first_name: null});
    }
    render() {
        return (
            <div>
                {!this.state.loggedIn ? 
                <form className="logIn" onSubmit={this.logIn}>
                    <label htmlFor="username">
                        Username: 
                        <input type="text" 
                            name="username"
                            required
                            ref="username"
                        />
                    </label>
                    <label htmlFor="password">
                        Password:
                        <input type="text" 
                            name="password"
                            required
                            ref="password"
                        />
                    </label>
                    <input type="submit" value="Log In"/>
                </form>
                
                :
                
                <div>
                    <h2> Welcome {this.state.first_name}</h2>
                    <button onClick={this.logOut}>Log Out</button>
                </div>    
              }

              <p>{this.state.response}</p>
            </div>

        )
    }

}
     