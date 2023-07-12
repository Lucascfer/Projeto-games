import { useEffect, useState } from 'react';
import '../Styles/Favorites.css'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Services/firebaseConfig';
import { GamesCard } from '../components/GamesCard';
import { Loading } from '../components/Loading';

const Favorites = () => {
    const useCollectionRef = collection(db, 'games');

    const [message, setMessage] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

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
            }
        }
        getCards();
        setLoading(false);
    })

    return (
        <div className="favorites">
            <h1 className='titleFav'>Favoritos</h1>
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
                !loading && favorites.length > 0 &&
                favorites.map((game) => {
                    return (
                        <div className="favs" key={game.id}>
                            <GamesCard game={game} actived={true} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Favorites;