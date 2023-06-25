import '../Styles/Loading.css'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export const Loading = () => {
    return (
        <div className="loaderContainer">
            <AiOutlineLoading3Quarters className="loader" />
        </div>
    )
}
