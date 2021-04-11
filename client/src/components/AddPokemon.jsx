import React from 'react';
import Axios from 'axios';

class AddPokemon extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      type: '',
      imgUrl: '',
      addPokemon: false
    }
  }

  handleAddPokemonToggle() {
    this.setState({
      addPokemon: !this.state.addPokemon
    })
  }

  handleFormInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log(this.state.name))
  }

  handleSubmitPokemon() {
    // console.log()
    Axios.post('/pokemon', { name: this.state.name, type: this.state.type, imgUrl: this.state.imgUrl })
      .then(() => this.props.getAll())
      .then(() => this.handleAddPokemonToggle())
      .catch((err) => console.log(err))
  }


  render() {
    if (this.state.addPokemon) {
      return (
        <div>
          {/* <button onClick={() => this.handleAddPokemonToggle()}>Add Pokemon</button> */}
          <form>
            <input placeholder="Enter Name" name="name"></input><br/>
            <input placeholder="Enter Type" name="type"></input><br/>
            <input placeholder="Enter Image Url" name="imgUrl"></input><br/>
            <button onClick={(e) => {e.prevent.default; this.HandleSubmitPokemon()}}>Submit</button>
          </form>
        </div>
      )
      } else {
        return (
          <div>
            <button onClick={() => this.handleAddPokemonToggle()}>Add Pokemon</button>
          </div>
        )
    }
  }
}

export default AddPokemon;