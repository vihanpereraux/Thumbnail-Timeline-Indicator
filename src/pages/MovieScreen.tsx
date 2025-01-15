import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

// react player
import ReactPlayer from "react-player";

// props
import {
    MovieScreenProps,
    UserClickDetailsProps
} from "../interfaces/MovieScreenProps";

let userClickDetails: UserClickDetailsProps[] = [];

let currentMovieDetails: UserClickDetailsProps = {
    id: 0,
    title: "",
    videoPlayedSeconds: 0
}

const MovieScreen: React.FC = () => {
    // getting the props
    const location = useLocation();
    const { id, title } = location.state as MovieScreenProps;

    const [videoPlayedSeconds, setVideoPlayedSeconds] = useState<number>(0)
    const [isVideoPlaying, setisVideoPlaying] = useState<boolean>(false)

    useEffect(() => {
        // localStorage.setItem('userClickDetails', JSON.stringify([]))
        userClickDetails = JSON.parse(localStorage.getItem('userClickDetails') as string);

        for (let i = 0; i < userClickDetails.length; i++) {
            if (id == userClickDetails[i].id) {
                currentMovieDetails.id
                    = userClickDetails[i].id;
                currentMovieDetails.title
                    = userClickDetails[i].title;
                currentMovieDetails.videoPlayedSeconds
                    = userClickDetails[i].videoPlayedSeconds;

                setVideoPlayedSeconds(userClickDetails[i].videoPlayedSeconds)
            }
        }

        const isMovieInList = userClickDetails.some(movie => movie.id === id);
        console.log(isMovieInList)
        if (!isMovieInList) {
            let userClickDetailsSnapshot = {
                id: id,
                title: title,
                videoPlayedSeconds: 0
            }
            userClickDetails.push(userClickDetailsSnapshot)
            localStorage.setItem('userClickDetails', JSON.stringify(userClickDetails))
        }
    }, [])

    // ref
    const playerRef = useRef<ReactPlayer>(null);
    const onReady = () => {
        isVideoPlaying ?
            ""
            :
            playerRef.current?.seekTo(videoPlayedSeconds, "seconds")
    }

    const onPlayHandler = () => {
        setisVideoPlaying(true)
    }

    const onPauseHandler = () => {
        setisVideoPlaying(false)
        // 
        currentMovieDetails.videoPlayedSeconds = playerRef.current?.getCurrentTime() as number
        // 
        userClickDetails.map((movie) => {
            if (movie.id == id) {
                movie.videoPlayedSeconds = currentMovieDetails.videoPlayedSeconds;
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