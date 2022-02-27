export const pagesGroup = new Map([
    ['spacer-top', [{ type: 'spacer', className: 'spacer-x05' }]],
    ['group-top', []],
    ['spacer-bottom', [{ type: 'spacer', className: 'spacer' }]],
    ['group-bottom', []]
])

export const pages = new Map() // 'name' : pageInfo

export const addPageInfo = (pageInfo) => {
    const { groupName = 'group-top', name } = pageInfo
    const group = pagesGroup.get(groupName)
    group.push(name)

    pages.set(name, pageInfo)
}
