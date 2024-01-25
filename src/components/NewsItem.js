// NewsItem.js
import React, { Component } from 'react';

class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;

    return (
      <div className='my-3'>
        <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '90%', zIndex: '1'}}>{source}</span>
          <img
            src={!imageUrl ? "https://images.moneycontrol.com/static-mcnews/2024/01/Japans-Moon-Mission-Slim1-770x433.png" : imageUrl}
            className="card-img-top"
            alt="News"
          />
          <div className="card-body">
            <h5 className="card-title">{title} </h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknown" : author} on {new Date(date).toUTCString()}</small></p>
            <a href={newsUrl} target='_blank' className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
