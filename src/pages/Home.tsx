import React from "react";
import { useNavigate } from "react-router-dom";

const movieList = [
    {
        title: "Tenet",
        poster: '/posters/poster_1.jpg',
        url: '/movies/movie.mp4',
    },
    {
        title: "1917",
        poster: '/posters/poster_2.jpg',
        url: '/movies/movie.mp4'
    },
    {
        title: "Oblivion",
        poster: '/posters/poster_3.jpg',
        url: '/movies/movie.mp4'
    }
]

console.log(movieList.length)

const Home: React.FC = () => {
    const navigate = useNavigate();

    // poster click handler
    const handlePosterClick = () => {
        navigate('/screen')
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
                            onClick={handlePosterClick}
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
