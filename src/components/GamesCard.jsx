/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { BiLinkExternal } from "react-icons/bi"
import '../Styles/GamesCard.css'
import { Avaliation } from "./Avaliation"
import { AiFillHeart } from 'react-icons/ai'
import { deleteDoc, doc, setDoc } from "firebase/firestore"
import { db } from "../Services/firebaseConfig"
import { useState } from "react"


export const GamesCard = (props) => {

  const { game, actived } = props;
  const [active, setActive] = useState(false)
  const [msg, setMsg] = useState('')
  const user = JSON.parse(sessionStorage.getItem("user"));

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
      game_url: g.game_url
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
    setActive(actived)
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

          <Avaliation/>

        </div>
        <Link className="link" to={game.game_url} target="_blank">Site do jogo <BiLinkExternal className="icon" /></Link>
      </div>
      {msg && <h2 className="message">{msg}</h2>}
    </>
  )
}
