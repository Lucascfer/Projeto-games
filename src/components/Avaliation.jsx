import { useState } from 'react'
import { Star } from './Star'

export const Avaliation = () => {
    const stars = [... new Array(4).keys()]
    const [activeIndex, setActiveIndex] = useState()
    const [msg, setMsg] = useState('')
    const user = JSON.parse(sessionStorage.getItem("user"));

    function setMessage(msg) {
        setMsg(msg)

        setTimeout(() => {
            setMsg('');
        }, 3000)
    }

    const onClickStar = (index) => {
        if (user === 'default') {
            setMessage('Você precisa estar logado para avaliar')
            return
        }
        setActiveIndex(
            (oldState) => oldState === index ? undefined : index
        )
    }

    return (
            <div className='stars'>
                {stars.map(index => (
                    <Star key={index} isActive={index <= activeIndex} onClick={() => onClickStar(index)} />
                ))}
                {msg && <h2 className="messageStar">{msg}</h2>}
            </div>
    )
}