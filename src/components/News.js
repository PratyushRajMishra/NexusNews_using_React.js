// News.js
import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes, { string } from 'prop-types'


class News extends Component {

static defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
}

static propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

capitalizedFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

constructor(props) {
  super(props);
  this.state = {
    articles: [],
    loading: false,
    page: 1,
  };
  document.title = `${this.capitalizedFirstLetter(this.props.category)} - NexusNews`;
}

  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f7e7baade284411681d48c17cdfd3684&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false });
  }
  

  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState({page: this.state.page - 1});
    this.updateNews();
  }

  handleNextClick = async () => {
    this.setState({page: this.state.page + 1});
    this.updateNews();
  }
  

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{margin: '25px 0px'}}>Nexus News - Top {this.capitalizedFirstLetter(this.props.category)} headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className='row'>
          {!this.state.loading && this.state.articles.map((element) => (
            <div className='col-md-4' key={element.url}>
              <NewsItem
                title={element.title ? element.title : ''}
                description={element.description ? element.description : ''}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                author={element.author}
                date={element.publishedAt}
                source={element.source.name}
              />
            </div>
          ))}
        </div>
        <div className='container d-flex justify-content-between my-3'>
          <button
            disabled={this.state.page <= 1}
            type='button'
            className='btn btn-dark'
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
            type='button'
            className='btn btn-dark'
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
