import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import NavBar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUmbrella, faTimesCircle, faCheckCircle, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';

import Logo from './components/Logo';
import Customers from './components/Customers';
import Raining from './components/Raining';
import Top4 from './components/Top4';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar bg="dark" variant="dark" className="py-1">
            <Link to="/">
              <NavBar.Brand as="span" href="#home">
                  <Logo/>
              </NavBar.Brand>
            </Link>
            <Nav className="mr-auto">
              <Nav.Item>
                <Link to="/raining" className="nav-link">Where is it Raining?</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/top4customers" className="nav-link">Top 4 Customers</Link>
              </Nav.Item>
            </Nav>
          </NavBar>
          <Container>
            <Switch>
              <Route path="/raining">
                <Raining/>
              </Route>
              <Route path="/top4customers">
                <Top4/>
              </Route>
              <Route path="/" exact>
                <Customers/>
              </Route>
              <Redirect to="/" />
            </Switch>
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}

library.add(faUmbrella, faTimesCircle, faCheckCircle, faPencilAlt, faTrash);

export default App;
