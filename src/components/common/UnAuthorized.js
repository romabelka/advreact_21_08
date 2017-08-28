import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class UnAuthorized extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h1>Unauthorized, please <Link to="/auth/signin">Sign In</Link></h1>
            </div>
        )
    }
}

export default UnAuthorized