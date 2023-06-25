import { useState } from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/NavBar.css'


export const NavBar = () => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();

        if (!search) return;

        navigate(`/search?q=${search}`);
        setSearch('');
    }

    return (
        <nav className="navbar">
            <Link className="logo" to="/">
                <h1 className="title">
                    Lista de Jogos
                </h1>
            </Link>
            <form className="search" onSubmit={handleSearch}>
                <input type="text" placeholder="Buscar nome do jogo" onChange={(e) => setSearch(e.target.value)} value={search} />
                <button type="submit">
                    <BiSearchAlt2 />
                </button>
            </form>
        </nav>
    )
}
