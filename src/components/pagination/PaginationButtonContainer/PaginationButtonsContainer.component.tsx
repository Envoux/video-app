import { ReactElement, useEffect, useState } from 'react'
import PaginationButton from '../PaginationButton/PaginationButton.component'
import PaginationButtonsContainerProps from './PaginationButtonsContainer.types'

const PaginationButtonsContainer: React.FC<PaginationButtonsContainerProps> = ({
    currentPage,
    lastPage,
}) => {
    const [content, setContent] = useState<ReactElement[]>([])
    useEffect(() => {
        let i = currentPage === 1 ? currentPage : currentPage - 1
        const j = currentPage + 1 < lastPage ? currentPage + 1 : lastPage
        let tempArray: ReactElement[] = []
        for (; i <= j; i++) {
            tempArray.push(
                <PaginationButton key={i} text={i + ''} to={'/videos/' + i} />
            )
        }
        setContent(tempArray.slice())
    }, [currentPage, lastPage])
    return (
        <div>
            <PaginationButton
                text="<"
                to={'/videos/' + (currentPage === 1 ? 1 : currentPage - 1)}
            />
            {content}
            <PaginationButton
                text=">"
                to={
                    '/videos/' +
                    (currentPage < lastPage ? currentPage + 1 : currentPage)
                }
            />
        </div>
    )
}

export default PaginationButtonsContainer
