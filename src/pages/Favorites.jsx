import { useEffect, useState } from 'react';
import '../Styles/Favorites.css'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Services/firebaseConfig';
import { GamesCard } from '../components/GamesCard';
import { Loading } from '../components/Loading';
import { IoFilterSharp } from 'react-icons/io5';
import { BiSearchAlt2 } from 'react-icons/bi';
import { AiFillCloseCircle } from 'react-icons/ai';

const Favorites = () => {
    const useCollectionRef = collection(db, 'games');
    const user = JSON.parse(sessionStorage.getItem("user"));

    const [message, setMessage] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [increaseMode, setIncreaseMode] = useState(true);
    const [categories, setCategories] = useState([]);
    const [selectedCategorys, setSelectedCategories] = useState('');
    const [search, setSearch] = useState('');
    const [favSearch, setFavSearch] = useState('');

    function increasing(a, b) {
        return a.rating - b.rating;
    }
    function decreasing(a, b) {
        return b.rating - a.rating;
    }

    const getFilteredGenre = (selectedCategorys, games) => {
        if (!selectedCategorys) return games;
        return games.filter((game) => game.genre === selectedCategorys);
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
    const handleSelectedCategories = (category) => {
        if (selectedCategorys === category) {
            setSelectedCategories('');
            return;
        }
        setSelectedCategories(category);
    }

    const getGameSearched = (search, favs) => {
        if (!search) return favs;
        const favsSearched = favs.filter((g) => g.title.toLowerCase().includes(search.toLowerCase()));
        setFavSearch(favsSearched);
    }
    const handleSearch = (e) => {
        e.preventDefault();
        if (!search) return;
        getGameSearched(search, favorites)
        setSearch('');
    }
    useEffect(() => {
        setLoading(true);
        const getCards = async () => {
            const data = await getDocs(useCollectionRef);
            const docs = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            if (docs.length == 0) {
                setMessage("Lista de favoritos vazia");
            }
            else {
                setFavorites(docs);
                increaseMode ? docs.sort(increasing) : docs.sort(decreasing);
                const categories = getCategories(docs);
                setCategories(categories);
            }
            if (user === 'default') {
                setMessage('Você precisa estar logado para ver os favoritos');
            }
        }
        getCards();
        setLoading(false);
    }, [favorites]);

    const filteredGenre = getFilteredGenre(selectedCategorys, favorites);

    return (
        <div className="favorites">
            <header className='titleFav'>
                <h1>Favoritos</h1>
                <button type="button" className="switch" onClick={() => setIncreaseMode(!increaseMode)}>
                    {increaseMode ? 'Ordem Crescente' : 'Ordem Decrescente'}
                    <IoFilterSharp style={increaseMode ? { transform: 'rotate(0deg)' } : { transform: 'rotate(180deg)' }} />
                </button>
            </header>
            <div className="categories">
                {
                    !loading && !message && categories.map((cat) => {
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
            <form className="search" onSubmit={handleSearch}>
                <input type="text" placeholder="Buscar nome do jogo favoritado" onChange={(e) => setSearch(e.target.value)} value={search} />
                <button type="submit">
                    <BiSearchAlt2 />
                </button>
            </form>
            {
                message &&
                <p className='messageFav'>{message}</p>
            }
            {
                loading &&
                <h1 className='messageFav'>
                    <Loading />
                </h1>
            }
            {
                !loading && favSearch.length > 0 && user !== 'default' &&
                favSearch.map((game) => {
                    return (
                        <div className="favs" key={game.id}>
                            <button className="closeTab" type="button" onClick={() => setFavSearch('')}>
                                <AiFillCloseCircle/>
                            </button>
                            <GamesCard game={game} />
                        </div>
                    )
                })
            }
            {
                !loading && favSearch.length === 0 && favorites.length > 0 && user !== 'default' &&
                filteredGenre.map((game) => {
                    return (
                        <div className="favs" key={game.id}>
                            <GamesCard game={game} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Favorites;