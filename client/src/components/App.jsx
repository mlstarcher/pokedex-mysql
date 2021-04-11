import React from 'react';
import Axios from 'axios';

import PokemonList from './PokemonList.jsx';
import TypeOption from './TypeOption.jsx';
import AddPokemon from './AddPokemon.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      pokemon: [],
      types: [],
      selectedType: 'all',
    }
    this.getAll = this.getAll.bind(this)
  }

  componentDidMount() {
    this.getAll()
    Axios.get('/types')
      .then((res) =>
        this.setState({
          types: res.data,
        })
      )
      .catch((err) => {
        console.log(err)
      })
  }

  getAll() {
    Axios.get('/pokemon')
      .then((res) =>
        this.setState({
          pokemon: res.data,
        })
      )
      .catch((err) => {
        console.log(err)
      })
  }

  handleSelect(e) {
    this.setState({
      selectedType: e.target.value,
    })
  }

  handleSelectAll(e) {
    e.preventDefault()
    this.setState({
      selectedType: 'all',
    })
  }

  render() {
    return (
      <div>
        <h1>Fullstack Pokedex!</h1>
        <AddPokemon getAll={this.getAll}/>
        <button onClick={(e) => this.handleSelectAll(e)}>Show All</button>
        <select id="types" onChange={(e) => this.handleSelect(e)}>
          {this.state.types.map((currentType, index) => {
            return <TypeOption currentType={currentType} key={index}/>
          })}
        </select>
        <PokemonList pokemon={this.state.pokemon} selectedType={this.state.selectedType} getAll={this.getAll}/>
      </div>
    )
  }
}

export default App;