import { useState, useEffect } from "react"
import { GamesCard } from "../components/GamesCard";
import { PiSmileySadLight } from 'react-icons/pi'
import axios from 'axios';
import '../Styles/Home.css'
import '../Styles/Filter.css'
import { Loading } from "../components/Loading";

const gamesURL = 'https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/';
const devAddress = 'emailteste@email.com';

export const Home = () => {
    const [games, setGames] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [selectedCategorys, setSelectedCategories] = useState('');

    const getFilteredGenre = (selectedCategorys, games) => {
        if (!selectedCategorys) return games;
        return games.filter((game) => game.genre === selectedCategorys);
    }

    const handleSelectedCategories = (category) => {
        if (selectedCategorys === category) {
            setSelectedCategories('');
            return;
        }
        setSelectedCategories(category);
    }

    const getCategories = (games) => {
        const genres = new Set();

        for (let game of games) {
            const { genre } = game;
            if (!genres.has(genre)) {
                genres.add(genre);
            }
        }
        return [...genres];
    }

    const fetchData = async () => {
        setLoading(true);

        try {
            const response = await axios.get(gamesURL, {
                headers: {
                    'dev-email-address': devAddress,
                },
                timeout: 5000,
            });

            setGames(response.data);
            const categories = getCategories(response.data);
            setCategories(categories);

        } catch (error) {
            if (error.response && [500, 502, 503, 504, 507, 508, 509].includes(error.response.status)) {
                setErrorMessage('O servidor falhou em responder. Tente recarregar a página.');
            } else if (error.code === 'ECONNABORTED') {
                setErrorMessage('O servidor demorou para responder, tente mais tarde.');
            } else {
                setErrorMessage('O servidor não conseguirá responder por agora, tente voltar novamente mais tarde');
            }
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredGenre = getFilteredGenre(selectedCategorys, games);

    return (
        <div className="container">
            <div className="categories">
                {
                    loading === false && !errorMessage && categories.map((cat) => {
                        const isActive = selectedCategorys === cat;

                        return (
                            <div className="filter" key={cat}>
                                <button
                                    className={`category ${isActive ? "active" : ""}`}
                                    onClick={() => handleSelectedCategories(cat)}>
                                    <h3>{cat}</h3>
                                </button>
                            </div>
                        )
                    })
                }
            </div>
            {loading === true && !errorMessage &&
                <h1 className='message'>
                    <Loading />
                </h1>}
            {loading === false && errorMessage &&
                <>
                    <h1 className='message'>{errorMessage}</h1>
                    <PiSmileySadLight className="iconSad" />
                </>
            }
            {
                loading === false && !errorMessage && filteredGenre.map((game) => {
                    return (
                        <div className="game" key={game.id}>
                            <GamesCard game={game} favorited={false} />
                        </div>
                    )
                })
            }
        </div>
    )
}
