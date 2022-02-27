import { useContext } from 'react'
import { PageManagerContext } from '../context'

function PageHolder() {
    const pageManager = useContext(PageManagerContext)
    const Component = pageManager.getComponent(pageManager.currentPage)
    const componentProps = pageManager.getComponentProps()

    return (
        <div className="page-holder">
            <Component props={componentProps} />
        </div>
    )
}

export default PageHolder
