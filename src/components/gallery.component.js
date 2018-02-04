// libs
import React, { Component } from 'react';
import axios from 'axios';
import marked from 'marked';

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

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();

  return (
      rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&    
      (
        (rect.left >= 0 &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)) ||
        (rect.right > 0 &&
          rect.right <= ((window.innerWidth + rect.width) || (document.documentElement.clientWidth + rect.width))) 
      )  
  );
}

class Gallery extends Component {

  constructor(props) {
    super(props);
    this.state = { galleryData: null, loading: true, photos: [] };
  }

  componentDidMount() {
    this.fetchGalleryData('galleries');
    window.scrollConverter.activate();
    this.registerKeyboardNavigation(true);
  }

  componentWillUnmount() {
    window.scrollConverter.deactivate();
    this.registerKeyboardNavigation(false);
  }

  registerKeyboardNavigation(state) {
    if(state) window.addEventListener('keydown', this.handleKeyPress.bind(this))
    else window.removeEventListener('keydown', this.handleKeyPress.bind(this));
  }

  handleKeyPress(e) {
    e = e || window.event;

    if (e.keyCode === '37' || e.keyCode === 37) {
      this.previousPhoto();
      e.preventDefault();
    } else if (e.keyCode === '39' || e.keyCode === 39) {
      this.nextPhoto();
      e.preventDefault();
    }

    return false;
  }

  previousPhoto() {
    const visible = this.state.photos.map(img => img && isElementInViewport(img));
    let visibleIdx = visible.indexOf(true);
    visibleIdx = (visibleIdx + this.state.photos.length - 1) % this.state.photos.length;
    this.state.photos[visibleIdx].scrollIntoView({ block: "end", inline: "end" });
  }

  nextPhoto() {
    const visible = this.state.photos.map(img => img && isElementInViewport(img));
    let visibleIdx = visible.lastIndexOf(true);
    visibleIdx = (visibleIdx + this.state.photos.length + 1) % this.state.photos.length;
    if (visibleIdx === 0) {
      this.state.photos[visibleIdx].scrollIntoView({ block: "end", inline: "end" });    
    } else {
      this.state.photos[visibleIdx].scrollIntoView({ block: "start", inline: "start" });
    }
  }

  fetchGalleryData(handle) {
    this.setState({ loading: true });
    return axios.get(
      `${apiConf.baseUrl}/${apiConf.endpoints.collections}/${handle}?token=${apiConf.token}`
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
          <article className="gir-gallery__wrapper">
              {
                this.state.galleryData.content &&
                <div className="gir-gallery__description-wrapper">
                  <aside className="gir-gallery__description" dangerouslySetInnerHTML={ { __html: marked(this.state.galleryData.content) } }/>
                </div>
              }
            <div className="gir-gallery__images">
              {
                this.state.galleryData.photos.map(photo =>
                  <img ref={(img) => { if (img && !this.state.loading && !this.state.photos.find(photo => img.id === photo.id)) this.state.photos.push(img) }} id={photo.meta.asset} src={`${apiConf.baseUrl}${photo.path}`} className={this.state.loading ? 'hidden' : ''} key={ photo.meta.asset } alt={ photo.meta.title } onLoad={ this.handleImageChange.bind(this) } onClick={ this.nextPhoto.bind(this) }/>
                )
              }
            </div>
          </article>
        }
      </section>
    );
  }
};

export default Gallery;