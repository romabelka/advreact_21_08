import React from 'react'
import {shallow, mount} from 'enzyme'
import {PeopleList} from './PeopleList'
import {PersonRecord} from '../../ducks/people'

const testPeople = [{
    firstName: 'Alex',
    lastName : 'Ivanov',
    email: 'iva@gmail.com'
},{
    firstName: 'Masha',
    lastName : 'Popova',
    email: 'mash@gmail.com'
}].map(event => new PersonRecord({...event, uid: Math.random().toString()}))

it('should render people list', () => {
    const container = shallow(<PeopleList people = {testPeople}/>)

    const rows = container.find('.test--people-list__row')

    expect(rows.length).toEqual(testEvents.length)
})

