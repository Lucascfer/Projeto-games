import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GamesCard } from '../components/GamesCard';
import axios from 'axios';
import '../Styles/Home.css';
import { Loading } from '../components/Loading';

const gamesURL = import.meta.env.VITE_API
const devAddress = import.meta.env.VITE_EMAIL;

export const Search = () => {
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [games, setGames] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const query = searchParams.get('q');

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(gamesURL, {
        headers: {
          'dev-email-address': devAddress,
        },
      });

      const gameCards = response.data.filter((game) => game.title.toLowerCase().includes(query.toLowerCase()));
      setGames(gameCards);
    } catch (error) {
      if (error.response && [500, 502, 503, 504, 507, 508, 509].includes(error.response.status)) {
        setErrorMessage('O servidor falhou em responder. Tente recarregar a página.');
      }
      else {
        setErrorMessage('O servidor não conseguirá responder por agora, tente voltar novamente mais tarde');
      }
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  return (
    <div className="container">
      <h2 className='subtitle'>
        Resultados para: <span>{query}</span>
      </h2>
      {loading === true && !errorMessage &&
        <h1 className='message'>
          <Loading />
        </h1>}
      {loading === false && errorMessage && <h1 className='message'>{errorMessage}</h1>}
      {loading === false && !errorMessage && games.length > 0 && games.map((game) => {
        return (
          <div className="game" key={game.id}>
            <GamesCard game={game} />
          </div>
        )
      })}
      {loading === false && !errorMessage && games.length === 0 && <h1 className='message'>Nenhum resultado encontrado</h1>}

    </div>
  )
}
