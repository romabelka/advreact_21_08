import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import AdminPage from './routes/AdminPage'
import AuthPage from './routes/AuthPage'
import PersonPage from './routes/PersonPage'
import ProtectedRoute from './common/ProtectedRoute'
import {connect} from 'react-redux'
import {moduleName, signOut} from '../ducks/auth'
import {Link} from 'react-router-dom'

class Root extends Component {
    static propTypes = {

    };

    render() {
        const {signOut, signedIn} = this.props
        const controls = signedIn
            ? (<div>
                <Link to="/people">People</Link>
                <button onClick = {signOut}>Sign out</button>
               </div>)
            : <Link to="/auth/signin">Sign in</Link>
        return (
            <div>
                {controls}
                <ProtectedRoute path="/admin" component={AdminPage}/>
                <ProtectedRoute path="/people" component={PersonPage}/>
                <Route path="/auth" component={AuthPage}/>
            </div>
        )
    }
}

export default connect(state => ({
    signedIn: !!state[moduleName].user
}), {signOut}, null, {pure: false})(Root)
