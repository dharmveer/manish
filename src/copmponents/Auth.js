import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegister:true,
            first_name : "",
            last_name: "",
            phone: "",
            email: "",
            address:"",
            password: "",
            status: 'Active',
            authUser:false
        }
    }
    valid = (event) => {
        console.log("Value from event:");
        this.setState({
            [event.target.name]: event.target.value,
        }, () => {
          console.log("New state in ASYNC callback:");
        });
      }

    login = () => {
        var config = {
          headers : {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'Authorization' : 'Bearer <token_here>'
          }
        };
        let data = {
          "email": this.state.email,
          "password" : this.state.password
        }
        axios.post('http://43.225.54.177:8080/users/login', data, config)
            .then((response) => {
                localStorage.setItem('auth',JSON.stringify(response.data.token));
          });
    
        event.preventDefault();
      }
    register =() =>{
        var config = {
            headers : {
              'Content-Type' : 'application/json',
              'Accept' : 'application/json',
              'Authorization' : 'Bearer'
            }
          };
          let data = {
            "first_name": this.state.first_name,
            "last_name" : this.state.last_name,
            "phone" : this.state.phone,
            "email": this.state.email,
            "address" : this.state.address,
            "password" : this.state.password,
            "status" : this.state.status
          }
          axios.post('http://43.225.54.177:8080/users/signup', data, config)
            .then((response) => {
                console.log(response);
                if(response.data.message=="User created") {
                    this.setState({authUser:true})
                    localStorage.setItem('auth',JSON.stringify(response.data.message));
                }
          })
          .catch(function (error) {
            console.log(error);
          })
          event.preventDefault();
    }
    render() {
        var auth =JSON.parse(localStorage.getItem('auth'));
        return (
            <div>
                {auth || this.state.authUser===true ?<Redirect to="home" ></Redirect> : null}
                {
                    this.state.isRegister?
                    <form className="App" onSubmit={this.login}>
                    <div className="login">
                        <h1>Login Form</h1>
                        <input type="text" placeholder="Email ID" name="email" required="required" onChange={this.valid}/>
                        <input type="password" placeholder="Password" name="password" required="required" onChange={this.valid}/>
                        <button type="submit">Login</button>
                        <button  onClick={()=>this.setState({isRegister:false})}>go to register</button>
                        
                    </div>
                </form>
                : 
                <div>
                <form className="App" onSubmit={this.register}>
                    <div className="login">
                    <h1>Login Form</h1>
                    <input
                        type="text"
                        value={this.state.first_name}
                        placeholder="First Name"
                        name="first_name"
                        required="required"
                        onChange={this.valid}
                    />
                    <input
                        type="text"
                        value={this.state.last_name}
                        placeholder="Last Name"
                        name="last_name"
                        required="required"
                        onChange={this.valid}
                    />
                    <input
                        type="text"
                        value={this.state.phone}
                        placeholder="Phone"
                        name="phone"
                        required="required"
                        onChange={this.valid}
                    />
                    <input
                        type="text"
                        value={this.state.address}
                        placeholder="address"
                        name="address"
                        required="required"
                        onChange={this.valid}
                    />
                    <input
                        type="text"
                        value={this.state.email}
                        placeholder="Email ID"
                        name="email"
                        required="required"
                        onChange={this.valid}
                    />
                    <input
                        type="password"
                        value={this.state.password}
                        placeholder="Password"
                        name="password"
                        required="required"
                        onChange={this.valid}
                    />
                    <button type="submit">Register</button>
                    <button  onClick={()=>this.setState({isRegister:true})}>go to login</button>
                    </div>
                </form>
                
            </div>
                }
            </div>
        );
    }
}

export default Auth;