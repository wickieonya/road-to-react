import React, { Component } from "react";
import axios from 'axios';
import "./App.css";

const DEFAULT_QUERY = "flask";
const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";

const isSearched = search_term => item =>
  item.title.toLocaleLowerCase().includes(search_term.toLocaleLowerCase());

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      search_term: DEFAULT_QUERY
    };
  }

  setSearchTopStories = result => {
    this.setState({ result });
  };

  componentDidMount() {
    const { search_term } = this.state;
    const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${search_term}`;
    axios.get(url)
    .then( response => this.setSearchTopStories(response.data.hits))
    .catch( error => console.log(error));
  }

  componentDidUpdate() {
    console.log(this.state.result);
  }

  onDismiss = id => {
    const isNotId = item => item.objectID !== id;
    const updated_list = this.state.list.filter(isNotId);
    this.setState({ list: updated_list });
  };

  onSearchChange = event => {
    this.setState({ search_term: event.target.value });
  };

  render() {
    const { search_term, result } = this.state;
    if (!result) { return null; }
    console.log(result);

    return (
      <div className="page">
        <div className="interactions">
          <Search value={search_term} onChange={this.onSearchChange}>
            Search
          </Search>
        </div>
        <Table list={result} pattern={search_term} onDismiss={this.onDismiss} />
      </div>
    );
  }
}

const Search = ({ value, onChange, children }) => (
  <form>
    {children}
    <input
      type="text"
      name="search"
      id="search_input"
      onChange={onChange}
      value={value}
    />
  </form>
);

const Table = ({ list, pattern, onDismiss }) => (
  <div className="table">
    {list.filter(isSearched(pattern)).map(item => {
      return (
        <div key={item.objectID} className="table-row">
          <span style={{ width: "40%" }}>
            <a href={item.url}>{item.title}</a>
          </span>
          <span style={{ width: "30%" }}> {item.author} </span>
          <span style={{ width: "7%" }}> {item.num_comments} </span>
          <span style={{ width: "7%" }}> {item.points} </span>
          <span style={{ width: "16%" }}>
            <Button
              onClick={() => onDismiss(item.objectID)}
              className="button-inline"
            >
              Dismiss
            </Button>
          </span>
        </div>
      );
    })}
  </div>
);

const Button = ({ onClick, className = "", children }) => (
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>
);

export default App;
