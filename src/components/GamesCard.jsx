/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { BiLinkExternal } from "react-icons/bi"
import '../Styles/GamesCard.css'

export const GamesCard = ({ game }) => {
  return (
    <div className="gamesCard">
      <img className="gameImage" src={'https://www.freetogame.com/g/' + game.id + '/thumbnail.jpg'} alt={game.title} />
      <h2 className="title">{game.title}</h2>
      <h3 className="publisher" >{game.publisher}</h3>
      <h3 className="shortDescription" >{game.short_description}</h3>
      <Link className="link" to={game.game_url} target="_blank">Site do jogo <BiLinkExternal className="icon" /></Link>
    </div>
  )
}
