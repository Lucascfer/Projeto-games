import { useState } from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/NavBar.css'

export const NavBar = () => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem("user"));

    const handleSearch = (e) => {
        e.preventDefault();

        if (!search) return;

        navigate(`/search?q=${search}`);
        setSearch('');
    }

    function logOut() {
        sessionStorage.clear();
        return navigate('/')
    }

    return (
        <div className="navbarContainer">
            <nav className="navbar">
                <Link className="logo" to="/">
                    <h1 className="title">
                        Lista de Jogos
                    </h1>
                </Link>
                <div className="search">
                    <form className="search" onSubmit={handleSearch}>
                        <input type="text" placeholder="Buscar nome do jogo" onChange={(e) => setSearch(e.target.value)} value={search} />
                        <button type="submit">
                            <BiSearchAlt2 />
                        </button>
                    </form>
                    <div className="buttons">
                        {
                            user === 'default' &&
                            <Link className='button' to="/auth">
                                <h2>Login</h2>
                            </Link>
                        }
                        <Link className='button' to="/favorites">
                            <h2>Favoritos</h2>
                        </Link>
                        {
                            user !== 'default' &&
                            <a className='button' onClick={() => logOut()}>
                                <h2>Logout</h2>
                            </a>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}
