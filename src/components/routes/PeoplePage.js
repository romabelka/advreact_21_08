import React, { Component } from 'react'
import CreateForm from '../people/CreateForm'
import {Route, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {create, moduleName} from '../../ducks/people'
import Loader from '../common/Loader'

class PeoplePage extends Component {
    static propTypes = {

    };

    render() {
        const {loading} = this.props
        return (
            <div>
                <h1>People Page</h1>
                <NavLink to="/people/create" activeStyle={{color: 'red'}}>create</NavLink>
                <Route path="/people/create" render={() => <CreateForm onSubmit = {this.handleCreatePerson}/>}/>
                {loading && <Loader />}
            </div>
        )
    }

    handleCreatePerson = ({firstName, lastName, email}) => this.props.create(firstName, lastName, email)
}

export default connect(state => ({
    loading: state[moduleName].loading
}), {create})(PeoplePage)