import { useState } from 'react'
import { Star } from './Star'

export const Avaliation = () => {
    const stars = [... new Array(4).keys()]
    const [activeIndex, setActiveIndex] = useState()

    const onClickStar = (index) => {
        setActiveIndex(
            (oldState) => oldState === index ? undefined : index
        )
    }

    return (
        <div className='stars'>
            {stars.map(index => (
                <Star key={index} isActive={index <= activeIndex} onClick={() => onClickStar(index)} />
            ))}
        </div>
    )
}