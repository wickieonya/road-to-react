import React, { Component } from "react";
import './App.css';


const list = [
  {
    title: "React",
    url: "https://reactjs.org",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1
  },
  {
    title: "Flask",
    url: "https://pocco.palletes.flask.org",
    author: "A B",
    num_comments: 3,
    points: 41,
    objectID: 2
  }
];

const isSearched = search_term => item =>
  item.title.toLocaleLowerCase().includes(search_term.toLocaleLowerCase());

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list,
      search_term: ""
    };
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
    const { search_term, list } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search value={search_term} onChange={this.onSearchChange}>
            Search
          </Search>
        </div>
        <Table list={list} pattern={search_term} onDismiss={this.onDismiss} />
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
          <span>
            <a href={item.url}>{item.title}</a>
          </span>
          <span> {item.author} </span>
          <span> {item.num_comments} </span>
          <span> {item.points} </span>
          <span>
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
