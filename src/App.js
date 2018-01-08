import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Home from './components/home.component.js';
import Gallery from './components/gallery.component.js';

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
              <ul className="gir-header__nav-links" >
                <li className="nav-links__item">
                  <Link to="/" onClick={ this.toggleMenu.bind(this) }>
                    <span className="nav-links__item-name">Home</span>
                    <span className="nav-links__item-label">MouMouMou</span>                    
                  </Link>
                </li>                
                <li className="nav-links__item">
                  <Link to="/gallery/contrast" onClick={ this.toggleMenu.bind(this) }>
                    <span className="nav-links__item-name">Contrast</span>
                    <span className="nav-links__item-label">PloumPloumpPoum</span>                    
                  </Link>
                </li>
                <li className="nav-links__item">
                  <Link to="/gallery/collages" onClick={ this.toggleMenu.bind(this) }>
                    <span className="nav-links__item-name">Collages</span>
                    <span className="nav-links__item-label">BlupBlupBlup</span>                    
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          <Route path="/">
            <main className={ 'gir-main' + (this.state.menuDisplayed ? ' overlay' : '') }>
              <Route exact path="/" component={Home}/>
              <Route exact path="/gallery/:galleryHandle" component={Gallery}/>            
            </main>
          </Route>
        </div>
      </Router>
    );
  }
}

export default App;
