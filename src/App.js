import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Home from './components/home.component.js';
import Gallery from './components/gallery.component.js';
import Contact from './components/contact.component.js';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';

// conf
import apiConf from './config/api.conf.js';

function toggleFullScreen(flag) {
  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

  if(flag && !doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  }
  if (!flag) {
    cancelFullScreen.call(doc);
  }
}
class App extends Component {

  constructor(props) {
    super(props);
    this.state = { menuDisplayed: false, loading: false, menuItems: [] };
  }
  
  componentDidMount() {
    this.setState({ loading: true });
    return axios.get(
      `${apiConf.baseUrl}/${apiConf.endpoints.collections}/menu?token=${apiConf.token}`
    ).then((menu) => {
      this.setState({ menuItems: menu.data.entries });
    });
  }

  toggleMenu(target) {
    if (target && target === 'gallery') {
      toggleFullScreen(true);
    } else if (target) {
      toggleFullScreen(false);
    }
    this.setState({ menuDisplayed: !this.state.menuDisplayed });
  }

  render() {
    return (
      <Router>
        <div className="gir">
          <header className={ 'gir-header' + (this.state.menuDisplayed ? ' overlay' : '') }>
            <nav className={ 'gir-header__nav' + (this.state.menuDisplayed ? ' overlay' : '') }>
              <button className={ 'btn--unstyled gir-header__nav-toggle' + (this.state.menuDisplayed ? ' active' : '') } onClick={ this.toggleMenu.bind(this, false) }>
                <span></span>
              </button>
              { this.state.menuDisplayed  &&
                <ul className="gir-header__nav-links" >
                  <CSSTransition in={this.state.menuDisplayed} timeout={500} classNames="fadeSlide">
                    <li className="nav-links__item">
                      <Link to="/" onClick={ this.toggleMenu.bind(this) }>
                        <span className="nav-links__item-name">Home</span>
                        <span className="nav-links__item-label">MouMouMou</span>
                      </Link>
                    </li>
                  </CSSTransition>
                  {
                    this.state.menuItems && this.state.menuItems.map(item => 
                      <CSSTransition in={this.state.menuDisplayed} key={ item.title } timeout={500} classNames="fadeSlide">
                      <li className="nav-links__item">
                        <Link to={`/gallery/${item.target.display}`} onClick={ this.toggleMenu.bind(this, 'gallery') }>
                          <span className="nav-links__item-name">{ item.title }</span>
                          <span className="nav-links__item-label">{ item.subtitle }</span>
                        </Link>
                      </li>
                      </CSSTransition>
                    )
                  }
                  <CSSTransition in={this.state.menuDisplayed} timeout={500} classNames="fadeSlide">
                    <li className="nav-links__item">
                      <Link to="/contact" onClick={ this.toggleMenu.bind(this) }>
                        <span className="nav-links__item-name">Contact</span>
                        <span className="nav-links__item-label">WoWoWo</span>
                      </Link>
                    </li>
                  </CSSTransition>
                </ul>
              }
            </nav>
          </header>
          <Route path="/">
            <main className={ 'gir-main' + (this.state.menuDisplayed ? ' overlay' : '') }>
              <Route exact path="/" component={Home}/>
              <Route exact path="/contact" component={Contact}/>              
              <Route exact path="/gallery/:galleryHandle" component={Gallery}/>
            </main>
          </Route>
        </div>
      </Router>
    );
  }
}

export default App;
