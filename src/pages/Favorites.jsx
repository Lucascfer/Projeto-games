import { useEffect, useState } from 'react';
import '../Styles/Favorites.css'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Services/firebaseConfig';
import { GamesCard } from '../components/GamesCard';
import { Loading } from '../components/Loading';
import { IoFilterSharp } from 'react-icons/io5';

const Favorites = () => {
    const useCollectionRef = collection(db, 'games');
    const user = JSON.parse(sessionStorage.getItem("user"));

    const [message, setMessage] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [increaseMode, setIncreaseMode] = useState(true);

    function increasing(a, b) {
        return a.rating - b.rating;
    }

    function decreasing(a, b) {
        return b.rating - a.rating;
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
                if (increaseMode) {
                    docs.sort(increasing);
                } else {
                    docs.sort(decreasing);
                }
            }
            if (user === 'default') {
                setMessage('Você precisa estar logado para ver os favoritos');
            }
        }
        getCards();
        setLoading(false);
    }, [favorites]);

    return (
        <div className="favorites">
            <header className='titleFav'>
                <h1>Favoritos</h1>
                <button type="button" className="switch" onClick={() => setIncreaseMode(!increaseMode)}>
                    {increaseMode ? 'Ordem Crescente' : 'Ordem Decrescente'}
                    <IoFilterSharp style={ increaseMode ? { transform: 'rotate(0deg)' } : { transform: 'rotate(180deg)'}}/>
                </button>
            </header>
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
                !loading && favorites.length > 0 && user !== 'default' &&
                favorites.map((game) => {
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