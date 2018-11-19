import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import LoginService from '../../service/login-service';
import store from 'store';
import { Message } from 'semantic-ui-react';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.handleLogout = this.handleLogout.bind(this); 
    this.state = {
      email: "",
      password: "",
      error: "",
      authenticated: false,
      redirectToReferrer: false
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    const email = this.state.email
    const pass =  this.state.password
    const LoginServiceInstance = new LoginService();
    LoginServiceInstance.Login(email,pass).then(result => {
      return result;
    }).then(data => {
       this.setState({ error: false });
       if (!data) {
        this.setState({ redirectToReferrer: false });
        return this.setState({ error: true });
      }
      this.setState({ authenticated: true });
      store.set('User', data);
      store.set('loggedIn', true);
      store.set('following',  store.get('following') || [{user:'louane.vidal@example.com', followed: 'don.white@example.com', date: '2015-07-25T23:14:54Z', state : 'accepted'}])
      this.props.history.push('/');       
      })
     
  }

  handleLogout = () => {
    console.log('se elimino usuario log')
    store.remove('loggedIn')
    this.setState({  isAuthenticated: false });
    this.setState({ redirectToReferrer: false });
  }

  render() {
    const { error } = this.state;
    return (
      <div className="Login">
        <h1>Login</h1>
        <form error={error.toString()} onSubmit={this.handleSubmit}>
          {error && < Message
          error={error.toString()}
          content="That username/password is incorrect. Try again!"
          />}
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsStyle="info"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit">
            Login
          </Button>
        </form>
      </div>
    );
  }
}