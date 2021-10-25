import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import PaginationButtonProps from './PaginationButton.types'

const PaginationButton: React.FC<PaginationButtonProps> = ({ text, to }) => {
    return (
        <Link to={to}>
            <Button>{text}</Button>
        </Link>
    )
}

export default PaginationButton
