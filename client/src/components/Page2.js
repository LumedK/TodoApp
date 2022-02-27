import { addPageInfo } from './PageInfo'

console.log('init page 2')

addPageInfo({
    name: 'page1',
    title: 'title page 2',
    iconName: 'TodoIcon'
})

const Page1 = () => {
    return (
        <div className="page">
            <h1>page 2</h1>
        </div>
    )
}
export default Page1
