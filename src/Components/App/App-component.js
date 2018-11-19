import React, { Component } from 'react';
import {Navbar, NavItem, Nav  }  from "react-bootstrap";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a className="App-title" href="/">KeepSocial</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <NavItem eventKey={1} href="#">
                  Login
                </NavItem>
                <NavItem eventKey={2} href="#">
                  Logout
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>;
        </header>     
      </div>
    );
  }
}

export default App;
