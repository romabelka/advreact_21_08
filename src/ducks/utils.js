import {OrderedMap, Map} from 'immutable'

export function generateId() {
    return Date.now()
}

export function fbDatatoEntities(data, RecordModel = Map) {
    return (new OrderedMap(data)).mapEntries(([uid, value]) => (
        [uid, (new RecordModel(value)).set('uid', uid)]
    ))
}

export function fbPeopleDatatoEntities(data, RecordModel = Map) {
    return Map(data).mapEntries(([uid, value]) => (
        [uid, (new RecordModel(value)).set('id', uid)]
    )).toList()
}