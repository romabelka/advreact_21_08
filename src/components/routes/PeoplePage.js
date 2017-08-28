import React, { Component } from 'react'
import {Route, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import AddUserForm from '../people/AddUserForm'
import {addUser, moduleName} from '../../ducks/people'
import Loader from '../common/Loader'

class PeoplePage extends Component {
    static propTypes = {};

    render() {
        const {loading,user} = this.props
        console.log(user)
        return (
            <div>
                <h1>People Page</h1>
                {user ? <div>Добавлен пользователь {user.firstname}<br/></div> : ''}
                <NavLink to="/people/add" activeStyle={{color: 'red'}}>add User</NavLink>
                <Route path="/people/add" render={() => <AddUserForm onSubmit={this.handleAdd}/>}/>
                {loading && <Loader/>}
            </div>
        )
    }

    handleAdd = (values) => this.props.addUser(values)

}

export default connect(state => {
    const people = state[moduleName]

    return {
        user: people.user.get(people.user.size - 1)
        /*loading: state[moduleName].loading*/
    }
}, {addUser})(PeoplePage)