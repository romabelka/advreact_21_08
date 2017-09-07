import React from 'react'
import {shallow, mount} from 'enzyme'
import {PersonList} from './PersonList'
import Loader from '../common/Loader'
import renderer from 'react-test-renderer'
import people from '../../mocks/people.mock'

jest.mock('react-dom', () => ({
  findDOMNode: () => ({}),
}));

const testPeople = people;

it('should render loader', () => {
    const container = shallow(<PersonList loading />)

    expect(container.contains(<Loader/>))
})

it('should request fetch data', (done) => {
  mount(<PersonList people = {[]} fetchAll={done}/>)
})

it('should renders correctly', () => {
  const tree = renderer.create(<PersonList people={testPeople} fetchAll={() => null} />);
  expect(tree).toMatchSnapshot();
});
