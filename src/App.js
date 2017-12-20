import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Home from './components/home.component.js';
import Foo from './components/foo.component.js';
import logo from './assets/logo_vr.png';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { menuDisplayed: false };
  }

  toggleMenu() {
    this.setState({ menuDisplayed: !this.state.menuDisplayed });
  }

  render() {
    return (
      <Router>
        <div className="gir">
          <header className="gir-header">
            <nav className={ 'gir-header__nav' + (this.state.menuDisplayed ? ' overlay' : '') }>
              <button className={ 'btn--unstyled gir-header__nav-toggle' + (this.state.menuDisplayed ? ' active' : '') } onClick={ this.toggleMenu.bind(this) }>
                <span></span>
              </button>
              { this.state.menuDisplayed &&
                <ul className="gir-header__nav-links" >
                  <li className="nav-links__item"><Link to="/foo" onClick={ this.toggleMenu.bind(this) }>Foo</Link></li>
                  <li className="nav-links__item"><Link to="/" onClick={ this.toggleMenu.bind(this) }>Home</Link></li>
                </ul>
              }
            </nav>
          </header>
          <main className={ 'gir-main' + (this.state.menuDisplayed ? ' overlay' : '') }>
            <img src={logo} className="gir-header__background"/>
          
            <Route exact path="/" component={Home}/>
            <Route exact path="/foo" component={Foo}/>            
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
