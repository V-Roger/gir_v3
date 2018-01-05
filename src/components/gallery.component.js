// libs
import React, { Component } from 'react';
import axios from 'axios';

// components
import Loader from './loader.component';

// conf
import apiConf from '../config/api.conf.js';

class Gallery extends Component {
  
  constructor(props) {
    super(props);
    this.state = { galleryData: null, loading: true };
    this.fetchGalleryData('galleries');
  }

  fetchGalleryData(handle) {
    this.setState({ loading: true });
    return axios.get(
      `${apiConf.baseUrl}/${apiConf.endpoints.galleries}/${handle}?token=${apiConf.token}`
    ).then((galleries) => {
      this.setState({ loading: false });
      this.setState({ galleryData: galleries.data.entries.find(entry => entry.title_slug === this.props.match.params.galleryHandle) });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.galleryData.title_slug !== nextProps.match.params.galleryHandle) {
      this.fetchGalleryData('galleries');
    }
  }

  render() {
    return(
      <section className="gir-gallery">
        { this.state.loading &&
          <Loader/>
        }
        { !this.state.loading && this.state.galleryData &&
          this.state.galleryData.photos.map(photo => 
            <img src={`${apiConf.baseUrl}${photo.path}`} key={photo.meta.asset} alt={photo.meta.title}/>
          )
        }
      </section>
    );
  }
};

export default Gallery;