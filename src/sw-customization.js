self.addEventListener( 'fetch', (event) => {
    if ( event.request.url.indexOf( '/public/' ) !== -1 ) {
      console.log('foo')
    return false;
  }
});
