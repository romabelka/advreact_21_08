import React from 'react'
import {connect} from 'react-redux'
import {moduleName} from '../../ducks/registeredUser'


const UserList = (props)=>{
    console.log(props)
        const _list = props.users.map(
            user=><li>{user.firstName} /{user.lastName}/ {user.email}</li>)
        return (
            <div>
                <h1>User list</h1>
                {_list}
            </div>
        )
}

export default connect(store=>({
    users:store[moduleName].users
}))(UserList)