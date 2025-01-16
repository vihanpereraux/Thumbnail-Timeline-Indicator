import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// 
import { UserClickDetailsProps } from "../interfaces/MovieScreenProps";

const movieList = [
    {
        id: 1,
        title: "Tenet",
        poster: '/posters/poster_1.jpg',
        url: '/movies/movie.mp4',
        indicatorWidth: 0
    },
    {
        id: 2,
        title: "1917",
        poster: '/posters/poster_2.jpg',
        url: '/movies/movie.mp4',
        indicatorWidth: 0
    },
    {
        id: 3,
        title: "Oblivion",
        poster: '/posters/poster_3.jpg',
        url: '/movies/movie.mp4',
        indicatorWidth: 0
    }
]

const Home: React.FC = () => {
    const [movieListState, setMovieListState] = useState<any []>([])
    const navigate = useNavigate();

    // poster click handler
    const handlePosterClick = (id: number, title: string) => {
        navigate('/screen', { state: { id, title } });
    }

    // 
    useEffect(() => {
        const userMovieStats: UserClickDetailsProps[]
            = JSON.parse(localStorage.getItem('userClickDetails') as string)
        console.log(userMovieStats)

        userMovieStats.map((record) => {
            movieList.map((item) => {
                record.id === item.id ?
                    item.indicatorWidth = record.playedPrecentage
                    :
                    null
            })
        })
        
        setMovieListState([...movieList])
    }, [])

    return (
        <>
            <div className='wrapper'>
                {movieListState.map((movie, index) => (
                    <div key={index}>
                        <div
                            className='video'>
                            {/* poster */}
                            <img
                                onClick={() => handlePosterClick(movie.id, movie.title)}
                                src={movie.poster} alt="Poster" />

                            {/* indicator */}
                            <div style={{
                                width: `${movie.indicatorWidth}%`,
                                height: 5,
                                backgroundColor: 'red',
                                position: 'absolute',
                                bottom: 0,
                                borderRadius: 2
                            }}></div>
                        </div>
                        {/* title */}
                        <p>{movie.title}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Home
