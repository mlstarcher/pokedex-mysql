import React from 'react';
import Axios from 'axios';

class PokemonInstance extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      update: false,
    }
  }

  handleDelete(id) {
    Axios.delete(`/pokemon/${id}`)
      .then((res) => console.log(res.data))
      .then(() => this.props.getAll())
      .catch((err) => console.log(err));
  }

  handleUpdateToggle() {
    this.setState({
      update: !this.state.update
    })
  }

  handleUpdateInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log(this.state.name))
  }

  updateName(id) {
    Axios.put(`/pokemon/${id}`, {name: this.state.name})
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
      .then(() => this.handleUpdateToggle())
      .then(() => this.props.getAll())
  }

  render() {
    if (this.state.update) {
      return (
        <div>
          <form>
            <input name='name' type='text' onChange={(e) => this.handleUpdateInput(e)}></input>
            <button onClick={(e) => { e.preventDefault(); this.updateName(this.props.currentPokemon.id)} }>Update</button>
          </form>
      <h3>{this.props.currentPokemon.type}</h3>
      <img src={this.props.currentPokemon.img}></img><br/>
      <button onClick={() => this.handleDelete(this.props.currentPokemon.id)}>Delete</button>
        </div>
      )
    } else {
      return (
        <div>
        <h2 onClick={() => this.handleUpdateToggle()}>{this.props.currentPokemon.name}</h2>
        <h3>{this.props.currentPokemon.type}</h3>
        <img src={this.props.currentPokemon.img}></img><br/>
        <button onClick={() => this.handleDelete(this.props.currentPokemon.id)}>Delete</button>
      </div>
      )
    }
  }
}

export default PokemonInstance;