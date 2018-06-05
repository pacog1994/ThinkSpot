import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import FaFloppy0 from 'react-icons/lib/fa/floppy-o';
/**
 * Form component for creating a spot
 */
export default class CreateSpotForm extends Component {  
    constructor (props) {
        super(props);
        this.state = {
            submitted: false
        }   
        this.submit = this.submit.bind(this);
    }

   submit = (e) => {
        e.preventDefault();
        if (this.refs.prompt.value != null) {
            this.setState({submitted: true})  
        }
    }

    render() {   
        const { prompt } = this.props
        
        return (
            <div>
                <form className="add-spot-form" onSubmit={this.submit}>
                    <label htmlFor="prompt">Enter Prompt: </label>
                    <br></br>
                    <textarea id="prompt" 
                        type="text" 
                        defaultValue={prompt}
                        required
                        ref="prompt"
                    />
                    <br></br>
                    <button><FaFloppy0/>Create Spot</button>
                </form>
                
                {this.state.submitted ? <Redirect to="/"/> : null} 
            </div>
         )
        
    }
}

CreateSpotForm.propTypes = {
    prompt: PropTypes.string,
}
