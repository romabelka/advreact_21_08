import React, { Component, PropTypes } from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import Loader from '../common/Loader'
import {addPerson, moduleName} from '../../ducks/people'
import PeopleTable from './PeopleTable'
import PeopleForm from './PeopleForm'


class PeoplePage extends Component {
  handleAddPerson = ({firstName, lastName, email}) => this.props.addPerson(firstName, lastName, email)

  static propTypes = {
    peopleList: PropTypes.array.isRequired
  }

  render() {
    const {loading, peopleList} = this.props

    const table = (peopleList.length > 0) ? <PeopleTable peopleList={peopleList} /> : null

    return (
      <div>
        <h1>Add people
          <NavLink
          to="/auth"
          style={{fontSize: '16px', fontWeight: '400', marginLeft: '6px'}}
          activeStyle={{color: 'red'}}>Log out</NavLink>
        </h1>
        {table}
        <PeopleForm peopleList={peopleList} onSubmit={this.handleAddPerson} />
        {loading && <Loader />}
      </div>
    )
  }
}


export default connect(state => ({
  loading: state[moduleName].loading,
  peopleList: state[moduleName].peopleList.toJS()
}), {addPerson})(PeoplePage)