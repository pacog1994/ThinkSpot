import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import FaFloppy0 from 'react-icons/lib/fa/floppy-o';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addSpot } from '../_actions'

/**
 * Form component for creating a spot
 */
class SpotForm extends Component {  
    
    constructor (props) {
        super(props);
        this.state = {
            author: null,
            title: null,
            content: null,
            submitted: false
        }   
        this.submit = this.submit.bind(this);
    }

   submit = (e) => {
        e.preventDefault();
        if (this.refs.title.value != null && 
            this.refs.body.value != null) {
            const user = JSON.parse(localStorage.getItem('redux-store')).user
            console.log(user.username)
            this.props.addSpot(user.username, 
                            this.refs.title.value,
                            this.refs.body.value)
            this.setState({submitted: true})  
        }
    }

    render() {   
        const { prompt } = this.props
        
        return (
            <div style={{ padding: "5px" }}>
                <form className="addSpotForm" onSubmit={this.submit}>
                    <label htmlFor="title">Title</label>
                    <br></br>
                    <input type="text"
                           required
                           ref="title"
                    />
                    <br></br>
                    <label htmlFor="content">Body</label>
                    <br></br>
                    <textarea id="prompt" 
                        type="text" 
                        defaultValue={prompt}
                        required
                        ref="body"
                    />
                    <br></br>
                    <button><FaFloppy0/>Create Spot</button>
                </form>
                
                {this.state.submitted ? <Redirect to="/spot"/> : null} 
            </div>
         )
        
    }
}

const mapStateToProps = (state) => {
    return {
        spot: state.spot
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addSpot: addSpot
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SpotForm)

SpotForm.propTypes = {
    prompt: PropTypes.string,
}
