import { Component } from "react";

import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
    };
    console.log("constructor");
  }

  componentDidMount() {
    //Lifecycle method
    console.log("componentDidMount");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) =>
        this.setState(
          () => {
            return { monsters: users };
          },
          () => {
            console.log(this.state);
          }
        )
      ); //Promise
  }

  onSearchChange = (event) => {
    console.log(event.target.value);
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchField };
    });
  }

  render() {
    const   {monsters, searchField} = this.state
    const   {onSearchChange} = this

    const filteredMonsters = monsters.filter((monsters) => {
      return monsters.name.toLocaleLowerCase().includes(searchField);
    });

    console.log("render");
    return (
      <div className="App">
        <h1 className="app-title">Monsters Rolodex</h1>

        <SearchBox
          className="monster-search-box"
          placeholder="search monster"
          onChangeHandler={onSearchChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
