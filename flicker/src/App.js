import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: {} };
  }

  async componentDidMount() {
    const response = await fetch('https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=6e89d09f2c91d51d72245aab867a22fb&gallery_id=66911286-72157647277042064&format=json&nojsoncallback=1&extras=owner_name,media,o_dims,url_s,url_m');
    const json = await response.json();
    this.setState({ data: json });
  }

  generatePhotoUrl = (photo) => `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;

  renderPhoto(photo) {
    localStorage.setItem('saved_ids', []);
    localStorage.getItem('saved_ids');
    console.log(photo);
    return (
      <div className="photoBox" key={photo.id}>
        <img src={this.generatePhotoUrl(photo)} alt={photo.id} />
        <div className="photoActions">
          <div className="text">
            <div className="titleBox">
              {photo.title}
            </div>
            <div className="line" />
            <div className="ownerBox">
              {photo.ownername}
            </div>
            <button className="button" type="button">Favourite</button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { data } = this.state;

    return (
      <div className="grid-container">
        {data?.photos?.photo.map((p) => this.renderPhoto(p))}
      </div>
    );
  }
}
export default App;
