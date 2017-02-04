import React from 'react';
import * as actions from '../actions/index'
import { connect } from 'react-redux';

class Input extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: ""
        }
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({value: e.target.value});
    }

    handleClick(e){
        e.preventDefault();
        this.props.dispatch(actions.addRecipe(this.state.value))
    }
    handleDelete(id){
        console.log(id)
        this.props.dispatch(actions.deleteRecipe(id))

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
                    {this.props.recipes.map(recipe => (
                        <li
                            key={Math.random()}
                            onClick={e => this.handleDelete(recipe.id)}
                        >{recipe.recipe}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        recipes: state,
    }
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         addRecipe: dispatch(addRecipe)
//     }
// }


export default connect(mapStateToProps)(Input);
