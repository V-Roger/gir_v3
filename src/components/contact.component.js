import React, { Component } from 'react';
import logo from '../assets/logo_vr.svg';
// components
import Loader from './loader.component';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  render() {
    return(
      <section className="gir-contact">
      { this.state.loading &&
        <Loader/>
      }
      {
        <article className="gir-contact__wrapper">
          <div className="gir-contact__header">
          <h1>Virgil Roger</h1>          
            <img src={ logo } alt="Virgil Roger"/>
          </div>
        </article>
      }
      </section>
    )
  }
}

export default Contact;