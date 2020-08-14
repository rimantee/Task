import React, { Component } from "react";

import './App.css';



class App extends Component {
  constructor() {
    super();
    this.state = { data: {} };
  }

  async componentDidMount() {
    const response = await fetch(`https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=6e89d09f2c91d51d72245aab867a22fb&gallery_id=66911286-72157647277042064&format=json&nojsoncallback=1`);
    const json = await response.json();
    this.setState({ data: json });
  }

  generatePhotoUrl = (photo) => 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg'

  renderPhoto(photo){
    return <img key={photo.id} src={this.generatePhotoUrl(photo)} alt={photo.id} />
  }

  render() {
    return (
      <div class="grid-container">
{this.state.data &&this.state.data.photos && this.state.data.photos.photo.map(p=>this.renderPhoto(p))}
      </div>
      
    );
    
  }
  
}
export default App;



