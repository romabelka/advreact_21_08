import React, { Component } from 'react'
import {connect} from 'react-redux'
import {addPerson,moduleName} from '../../ducks/people'
import NewPersonForm from '../people/NewPersonForm'
import Persons from '../people/Persons'

class PersonPage extends Component {
    static propTypes = {

    };

    render() {
        const {
            addPerson,
            error,
            entities
        }=this.props
        return (
            <div>
                <h2>Add new person</h2>
                <NewPersonForm onSubmit={addPerson}/>
                <p style={{
                    color:"red",
                    fontSize:"21px"
                }}>{error}</p> 
                <Persons 
                
                entities={entities.valueSeq().toArray()}
                />
            </div>
        )
    }
}

//entities={entities.valueSeq().toArray()}

export default connect(store=>({
    error:store[moduleName].error,
    entities:store[moduleName].entities
}), {addPerson})(PersonPage)