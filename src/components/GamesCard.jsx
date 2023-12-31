/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { BiLinkExternal } from "react-icons/bi"
import '../Styles/GamesCard.css'
import { AiFillHeart } from 'react-icons/ai'
import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore"
import { db } from "../Services/firebaseConfig"
import { useState } from "react"
import { Star } from "./Star"

export const GamesCard = ({ game }) => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [active, setActive] = useState(false)
  const [msg, setMsg] = useState('')
  const [activeIndex, setActiveIndex] = useState(-1)
  const stars = [... new Array(4).keys()]

  const getCards = async () => {
    const useCollectionRef = collection(db, 'games');
    const data = await getDocs(useCollectionRef);
    const docs = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    docs.map((docgame) => {
      if (docgame.id == game.id && user !== 'default') {
        setActive(true)
        setActiveIndex(docgame.rating)
      }
    })
  }

  async function onClickStar(index, g) {
    if (user === 'default') {
      setMessage('Você precisa estar logado para avaliar')
      return
    }
    setActiveIndex(
      (oldState) => oldState === index ? index = -1 : index
    )
    await setDoc(doc(db, "games", `${g.id}`), {
      image: 'https://www.freetogame.com/g/' + g.id + '/thumbnail.jpg',
      id: g.id,
      title: g.title,
      publisher: g.publisher,
      short_description: g.short_description,
      game_url: g.game_url,
      rating: index,
      genre: g.genre
    });
    if (active === false) {
      setActive(true);
      setMessage(g.title + ' foi adicionado aos favoritos')
    }
  }

  function setMessage(msg) {
    setMsg(msg)
    setTimeout(() => {
      setMsg('');
    }, 3000)
  }
  async function addFav(g) {
    if (user === 'default') {
      setMessage('Você precisa estar logado para favoritar')
      return
    }

    await setDoc(doc(db, "games", `${g.id}`), {
      email: user.email,
      image: 'https://www.freetogame.com/g/' + g.id + '/thumbnail.jpg',
      id: g.id,
      title: g.title,
      publisher: g.publisher,
      short_description: g.short_description,
      game_url: g.game_url,
      rating: activeIndex,
      genre: g.genre
    });
    setActive(true);
    setMessage(g.title + ' foi adicionado aos favoritos')
  }

  async function deleteFav(g) {
    await deleteDoc(doc(db, "games", `${g.id}`));
    setActive(false);
    setMessage(g.title + ' foi removido aos favoritos')
  }

  const handleClick = (g) => {
    if (active) {
      deleteFav(g);
    } else {
      addFav(g);
    }
  };

  useState(() => {
    getCards();
  }, [])

  return (
    <>
      <div className="gamesCard">
        <img className="gameImage" src={'https://www.freetogame.com/g/' + game.id + '/thumbnail.jpg'} alt={game.title} />
        <h2 className="title">{game.title}</h2>
        <h3 className="publisher" >{game.publisher}</h3>
        <h3 className="shortDescription" >{game.short_description}</h3>
        <div className="newicons">

          <button
            className={`heartIcon ${active ? 'added' : ''}`}
            onClick={() => handleClick(game)}
          >
            <AiFillHeart />
          </button>

          <div className='stars'>
            {stars.map(index => (
              <Star key={index} isActive={index <= activeIndex} onClick={() => onClickStar(index, game)} />
            ))}
          </div>

        </div>
        <Link className="link" to={game.game_url} target="_blank">Site do jogo <BiLinkExternal className="icon" /></Link>
      </div>
      {msg && <h2 className="message">{msg}</h2>}
    </>
  )
}