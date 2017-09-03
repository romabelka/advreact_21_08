import React from 'react'
import {connect} from 'react-redux'
import {moduleName} from '../../ducks/people'


const UserList = (props)=>{
        const _list = props.people.map(
            user=><li>{user.firstName} /{user.lastName}/ {user.email}</li>)
        return (
            <div>
                <h1>User list</h1>
                {_list}
            </div>
        )
}

export default connect(store=>({
    people:store[moduleName].entities
}))(UserList)