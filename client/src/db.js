import Dexie from 'dexie'

export const clientDB = new Dexie('clientDB')

clientDB.version(1).stores({
    todoList: '++id, userID',
    todoItem: '++id, todoListID'
})
