import React, { PropTypes } from 'react'

const PeopleTable = ({peopleList}) =>
  <div>
    <table style={{marginBottom: '25px'}}>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>E-mail</th>
        </tr>
      </thead>
      <tbody>
        { peopleList.map((el, index) => <PeopleTableRow person={el} key={index} /> ) }
      </tbody>
    </table>
  </div>


const PeopleTableRow = ({person: {firstName, lastName, email}}) =>
  <tr>
    <td>{firstName}</td>
    <td>{lastName}</td>
    <td>{email}</td>
  </tr>


PeopleTableRow.propTypes = {
  person: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }).isRequired
}

export default PeopleTable
