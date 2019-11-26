import React, { Component } from "react";

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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list
    };
  }

  onDismiss = id => {
    const isNotId = item => item.objectID !== id;
    const updated_list = this.state.list.filter(isNotId);
    this.setState({ list: updated_list });
  };

  render() {
    var hello_world = "Welcome to the Road to Learn React";
    return (
      <div>
        <h2> {hello_world} </h2>
        {this.state.list.map(item => {
          return (
            <div key={item.objectID}>
              <span>
                <a href="{item.url}">{item.title}</a>
              </span>
              <span> {item.author} </span>
              <span> {item.num_comments} </span>
              <span> {item.points} </span>
              <span>
                <button
                  onClick={() => this.onDismiss(item.objectID)}
                  type="button"
                >
                  Dismiss
                </button>
              </span>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
