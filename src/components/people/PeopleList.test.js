import React from 'react'
import {shallow, mount} from 'enzyme'
import events from '../../mocks/conferences'
import {PeopleList} from './PeopleList'
import Loader from '../common/Loader'
import {Table, Column, InfiniteLoader} from 'react-virtualized'
import {Record, OrderedMap, OrderedSet,List} from 'immutable'
import people from '../../mocks/people'

const testPeople = new OrderedMap({people})

it('should render loader', () => {
    const container = shallow(<PeopleList loading />)

    expect(container.contains(<Loader/>))
})

