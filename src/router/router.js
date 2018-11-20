import React, { Component } from "react";
import {BrowserRouter, NavLink, Route, Switch} from 'react-router-dom'
import {Navbar, NavItem, Nav}  from "react-bootstrap";
import Home from '../Components/Home/Home'
import Login from '../Components/Login/login-component'
import Message from '../Components/message/message'
import Profile from '../Components/profile/profile'
import Profiles from '../Components/profile/profiles'
import Friends from '../Components/friend/friend';
import Request from '../Components/friend/request';

const Loginstance = new Login();

export default class AppRoutes extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isLoading: true
    };
  }

  render() { 
    return(
      <BrowserRouter>
        <header className="App-header">
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <NavLink className="App-title" exact to="/">KeepSocial</NavLink>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} href="/Login">
                Login
              </NavItem>
              <NavItem eventKey={2} href="/Message">
                Message
              </NavItem>
              <NavItem eventKey={3} href="/Request">
                Request
              </NavItem>
              <NavItem eventKey={4} href="/Friends">
                Friends
              </NavItem>    
              <NavItem eventKey={5} href="/MyProfile">
                Profile
              </NavItem> 
              <NavItem eventKey={5} onClick={() => Loginstance.handleLogout()} href="/Login">
                Logout
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        </header>
        <Switch>
          <Route exact path='/' component={Home} onEnter={this.state.isAuthenticated} />
          <Route exact path='/Message' component={Message} onEnter={this.state.isAuthenticated} />
          <Route exact path='/Request' component={Request} onEnter={this.state.isAuthenticated} />
          <Route exact path='/Friends' component={Friends} onEnter={this.state.isAuthenticated} />
          <Route exact path='/MyProfile' component={Profiles} onEnter={this.state.isAuthenticated} />
          <Route exact path='/Profile/:handle' component={Profile}  />
          <Route exact path='/Login' component={Login} />
        </Switch>     
      </BrowserRouter> 
    )
  }
}


    

   

   


