// libs
import React, { Component } from 'react';
import axios from 'axios';

// components
import Loader from './loader.component';

// conf
import apiConf from '../config/api.conf.js';

function imagesLoaded(parentNode) {
  const imgElements = parentNode.querySelectorAll('img');
  for (const img of imgElements) {
    if (!img.complete) {
      return false;
    }
  }
  return true;
}

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
      this.setState({ galleryData: galleries.data.entries.find(entry => entry.title_slug === this.props.match.params.galleryHandle) });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.galleryData || this.state.galleryData.title_slug !== nextProps.match.params.galleryHandle) {
      this.fetchGalleryData('galleries');
    }
  }

  handleImageChange() {
    const galleryElement = this.refs.gallery;
    this.setState({
      loading: !imagesLoaded(galleryElement),
    });
  }

  render() {
    return(
      <section className="gir-gallery" ref="gallery">
        { this.state.loading &&
          <Loader/>
        }
        { this.state.galleryData &&
          this.state.galleryData.photos.map(photo => 
            <img src={`${apiConf.baseUrl}${photo.path}`} className={this.state.loading ? 'hidden' : ''} key={photo.meta.asset} alt={photo.meta.title} onLoad={this.handleImageChange.bind(this)}/>
          )
        }
      </section>
    );
  }
};

export default Gallery;