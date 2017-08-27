import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPerson, moduleName } from '../../ducks/people';
import NewPersonForm from '../people/NewPersonForm';
import PeopleList from '../people/PeopleList';

class PeoplePage extends Component {
  handleNewPerson = (person) => {
    console.log('---', person);
    this.props.addPerson(person)
  }
  
  render() {
    return (
      <div>
        <h1>People Page</h1>
        <NewPersonForm onSubmit = {this.handleNewPerson}/>
        <PeopleList people={this.props.people} />
      </div>
    );
  }
}

PeoplePage.propTypes = {};
PeoplePage.defaultProps = {};

export default connect(state => ({
  people: state[moduleName]
}), {addPerson})(PeoplePage);
