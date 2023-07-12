import { AiFillStar } from 'react-icons/ai'

export const Star = ({ isActive, onClick }) => {

    return (
        <button onClick={onClick}>
            <AiFillStar className={`star ${isActive ? 'actived' : ''}`} />
        </button>
    )
}
