import Dexie from 'dexie'

export const clientDB = new Dexie('clientDB')

clientDB.version(2).stores({
    todoList: '++id, userID, [userID+id], [userID+todoListID]',
    todoItem: '++id, todoListID'
})
