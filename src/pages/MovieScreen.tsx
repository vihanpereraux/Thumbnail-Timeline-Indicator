import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

// react player
import ReactPlayer from "react-player";

// props
import {
    MovieScreenProps,
    UserClickDetailsProps
} from "../interfaces/MovieScreenProps";

// 
let userClickDetails: UserClickDetailsProps[] = [];

// 
let currentMovieDetails: UserClickDetailsProps = {
    id: 0,
    title: "",
    videoPlayedSeconds: 0,
    totalLenght: 0,
    playedPrecentage: 0
}

const MovieScreen: React.FC = () => {
    // getting the props
    const location = useLocation();
    const { id, title } = location.state as MovieScreenProps;

    const [duration, setDuration] = useState<number>(0)
    const [videoPlayedSeconds, setVideoPlayedSeconds] = useState<number>(0)
    const [isVideoPlaying, setisVideoPlaying] = useState<boolean>(false)

    // ref
    const playerRef = useRef<ReactPlayer>(null);
    const onReady = () => {
        isVideoPlaying ?
            null
            :
            playerRef.current?.seekTo(videoPlayedSeconds, "seconds")
    }

    useEffect(() => {
        // 
        localStorage.getItem('userClickDetails') as string === null ?
            localStorage.setItem('userClickDetails', JSON.stringify(userClickDetails))
            :
            userClickDetails = JSON.parse(localStorage.getItem('userClickDetails') as string);

        // 
        const isMovieInList = userClickDetails.some(movie => movie.id === id);
        console.log(isMovieInList)
        if (!isMovieInList) {
            let detailsSnapshot = {
                id: id,
                title: title,
                videoPlayedSeconds: 0,
                totalLenght: duration,
                playedPrecentage: 0
            }
            userClickDetails.push(detailsSnapshot)
            localStorage.setItem('userClickDetails', JSON.stringify(userClickDetails))
        }

        //  
        userClickDetails.map((movie) => {
            if (id == movie.id) {
                currentMovieDetails.id = movie.id;
                currentMovieDetails.title = movie.title;
                currentMovieDetails.videoPlayedSeconds = movie.videoPlayedSeconds;
                setVideoPlayedSeconds(movie.videoPlayedSeconds)
            }
        })
    }, [])

    const onPlayHandler = () => {
        setisVideoPlaying(true)

        // 
        currentMovieDetails.totalLenght = duration
    }

    const onPauseHandler = () => {
        setisVideoPlaying(false)

        console.log(currentMovieDetails.videoPlayedSeconds)
        console.log(duration)
        console.log((currentMovieDetails.videoPlayedSeconds / duration) * 100)

        // 
        currentMovieDetails.videoPlayedSeconds = playerRef.current?.getCurrentTime() as number

        // 
        currentMovieDetails.playedPrecentage
            = (currentMovieDetails.videoPlayedSeconds / duration) * 100

        // 
        userClickDetails.map((movie) => {
            if (movie.id == id) {
                movie.videoPlayedSeconds = currentMovieDetails.videoPlayedSeconds;
                movie.totalLenght > 0 ?
                    movie.totalLenght = duration
                    :
                    null
                movie.playedPrecentage = currentMovieDetails.playedPrecentage
            }
        });
        // 
        localStorage.setItem('userClickDetails', JSON.stringify(userClickDetails));
        setVideoPlayedSeconds(currentMovieDetails.videoPlayedSeconds);
    }

    return (
        <>
            {/* movie title */}
            <h5
                style={{
                    textAlign: 'center',
                    fontSize: 25,
                    fontWeight: 450,
                    marginBottom: 20,
                    paddingTop: 25,
                    marginTop: 0,
                }}>
                {title} {id}</h5>

            <div className="movie_screen_wrapper">
                <ReactPlayer
                    ref={playerRef}
                    playing={false}
                    width={1280 / 2}
                    height={720 / 2}
                    controls={true}
                    onDuration={(seconds) => {
                        console.log(seconds)
                        setDuration(seconds)
                    }}
                    onPlay={onPlayHandler}
                    onPause={onPauseHandler}
                    // onSeek={() => { 1000 }}
                    url="/movies/movie.mp4"
                    onReady={onReady}
                />
            </div>
        </>
    )
}

export default MovieScreen