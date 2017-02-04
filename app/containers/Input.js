import React from 'react';
import addRecipe from '../actions/index'
import { connect } from 'react-redux';

class Input extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: ""
        }
    }

    handleChange(e) {
        console.log(this.state);
        e.preventDefault();
        this.setState({value: e.target.value});
    }

    handleClick(e){
        e.preventDefault();
        this.props.dispatch(addRecipe(this.state.value))
    }
    render() {
        console.log("PROPS", this.props);
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
                        <li key={Math.random()}>{recipe}</li>
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


export default connect (mapStateToProps)(Input);
