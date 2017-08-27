import React, { Component } from 'react';

class PeopleList extends Component {
  render() {
    const { people } = this.props
    return (
      <div>
        <h2>People List</h2>
        {people.map(({id, ...rest}) => (
          <div key={id}>{Object.values(rest).join(' ')}</div>
        ))}
      </div>
    );
  }
}

PeopleList.propTypes = {};
PeopleList.defaultProps = {};

export default PeopleList;
