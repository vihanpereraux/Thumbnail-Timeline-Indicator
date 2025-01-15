import React from "react";
import { useNavigate } from "react-router-dom";

const movieList = [
    {
        id: 1,
        title: "Tenet",
        poster: '/posters/poster_1.jpg',
        url: '/movies/movie.mp4',
    },
    {
        id: 2,
        title: "1917",
        poster: '/posters/poster_2.jpg',
        url: '/movies/movie.mp4'
    },
    {
        id: 3,
        title: "Oblivion",
        poster: '/posters/poster_3.jpg',
        url: '/movies/movie.mp4'
    }
]

const Home: React.FC = () => {
    const navigate = useNavigate();

    // poster click handler
    const handlePosterClick = (id: number, title: string) => {
        // localStorage.setItem('userClickDetails', JSON.stringify(userClickDetails))
        // navigate('/screen')
        navigate('/screen', { state: { id, title } });
    }

    return (
        <>
            <div className='wrapper'>
                {movieList.map((movie, index) => (
                    <div
                        key={index}
                        className='video'>
                        {/* poster */}
                        <img
                            onClick={() => handlePosterClick(movie.id, movie.title)}
                            src={movie.poster} alt="Poster" />
                        {/* title */}
                        <p>{movie.title}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Home
