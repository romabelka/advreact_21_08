import React from 'react'
import {shallow, mount} from 'enzyme'
import {PersonList} from './PersonList'
import Loader from '../common/Loader'

const testPeople = []

for (let i = 0; i < 123; i += 1) {
  testPeople.push({
    uid: Math.random().toString(),
    firstName: Math.random().toString(),
    lastName: Math.random().toString(),
    email: `${Math.random().toString()}@${Math.random().toString()}`
  })
}

it('should render loader', () => {
    const container = shallow(<PersonList loading />)

    expect(container.contains(<Loader/>))
})

it('should request fetch data', (done) => {
  mount(<PersonList people = {[]} fetchAll={done}/>)
})
