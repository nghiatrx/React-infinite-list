import React from "react";
import ReactDOM from "react-dom";

const RenderItems = React.memo(props => {
  console.log("render");
  return props.items.map((item, index) => <div key={index}>Item: {item}</div>);
});

const getItems = page => {
  let result = [];
  let from = (page - 1) * 10;
  let to = 10 + (page - 1) * 10;
  for (let i = from; i < to; i++) {
    result.push(i);
  }
  return result;
};

class App extends React.Component {
  state = {
    array: []
  };
  page = 1;

  componentDidMount() {
    this.setState({
      array: [getItems(1)]
    });
  }
  handleLoadMore = () => {
    this.page += 1;
    let items = getItems(this.page);
    let newArray = this.state.array.concat([items]);
    this.setState({ array: newArray });
  };

  render() {
    return (
      <div className="App">
        {this.state.array.map((items, index) => (
          <RenderItems key={index} items={items} />
        ))}

        <button onClick={this.handleLoadMore}>Load more</button>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
