import React, { Component } from 'react'
import {Route, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {addPerson} from '../../ducks/people'
import RegisteredUserForm from '../admin/RegisteredUserForm'
import UserList from '../admin/UserList'

class AdminPage extends Component {

    render() {
        return (
            <div>
                <h1>Admin Page</h1>
                <NavLink to="/admin/people" activeStyle={{color: 'red'}}>Registered user</NavLink>
                <NavLink to="/admin/users" activeStyle={{color: 'red'}}>User list</NavLink>
                <Route path="/admin/people" render={() => <RegisteredUserForm onSubmit = {this.handleAddUser}/>}/>
                <Route path="/admin/users" render={() => <UserList onSubmit = {this.handleAddUser}/>}/>
            </div>
        )
    }
    handleAddUser=({email, lastName,firstName}) => this.props.addPerson({email, lastName,firstName})
}

export default connect(null, {addPerson})(AdminPage)