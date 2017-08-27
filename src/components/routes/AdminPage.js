import React, { Component } from 'react'
import {Route, NavLink} from 'react-router-dom'
//import {connect} from 'react-redux'
//import {registeredUser} from '../../ducks/registeredUser'
//import Loader from '../common/Loader'
import RegisteredUserForm from '../admin/RegisteredUserForm'


class AdminPage extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h1>Admin Page</h1>
                <NavLink to="/admin/people" activeStyle={{color: 'red'}}>Registered user</NavLink>
               
                <Route path="/admin/people" render={() => <RegisteredUserForm onSubmit = {this.handleSignIn}/>}/>
                
            </div>
        )
    }
}

export default AdminPage
// export default connect(state => ({
//     loading: state[moduleName].loading
// }), {signUp})(AdminPage)
//<NavLink to="/admin/users" activeStyle={{color: 'red'}}>sign up</NavLink>
//<Route path="/auth/users" render={() => <UserList />}/>