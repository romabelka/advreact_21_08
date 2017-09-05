import React from 'react'
import {shallow, mount} from 'enzyme'
import events from '../../mocks/conferences'
import {EventList} from './TableEventList'
import Loader from '../common/Loader'
import {EventRecord} from '../../ducks/events'

const testEvents = events.map(event => new EventRecord({...event, uid: Math.random().toString()}))

it('should render loader', () => {
    const container = shallow(<EventList loading />)

    expect(container.contains(<Loader/>))
})

it('should render event list', () => {
    const container = shallow(<EventList events = {testEvents}/>)

    const rows = container.find('.test--event-list__row')

    expect(rows.length).toEqual(testEvents.length)
})

it('should request fetch data', (done) => {
    mount(<EventList events = {[]} fetchAll={done}/>)
})

it('should select event', () => {
    let seleted = null
    const selectEvent = (uid) => seleted = uid

    const container = mount(<EventList
        events = {testEvents}
        fetchAll = {() => {}}
        selectEvent = {selectEvent}
    />)

    container.find('.test--event-list__row').first().simulate('click')

    expect(seleted).toEqual(testEvents[0].uid)
})