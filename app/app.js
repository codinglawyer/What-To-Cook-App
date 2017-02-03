import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import { connect } from 'react-redux'

const Recipes = (state = [], action) => {
    console.log(state);
    switch(action.type) {
        case 'ADD_RECIPE':
            return [...state, action.text]
        default:
            return state;
    }
}


const addRecipe = (text) => ({
    type: 'ADD_RECIPE',
    text,
})


let store = createStore(Recipes)

class Input extends React.Component {
  constructor(){
    super()
    this.state = {
      value: ""
    }
  }

componentDidMount(){
    let unsubscribe = store.subscribe(() => this.forceUpdate())

}
  handleChange(e) {
    console.log(this.state);
    e.preventDefault();
    this.setState({value: e.target.value});
  }

  handleClick(e){
    e.preventDefault();
    store.dispatch(addRecipe(this.state.value))
  }
  render() {
    return (
        <div>
            <input
              type="text"
              value={this.state.value}
              onChange={e => this.handleChange(e)}
            />
            <input
              onClick={e => this.handleClick(e)}
              type="submit"
            />
            <ul>
            {store.getState().map(recipe => (
                <li key={Math.random()}>{recipe}</li>
            ))}
            </ul>
        </div>
    )
  }
}





ReactDOM.render(
  <Input />,
  document.getElementById('app')
);



