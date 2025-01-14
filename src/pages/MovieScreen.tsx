import React, { useEffect, useRef, useState } from "react";

// react player
import ReactPlayer from "react-player";

const MovieScreen: React.FC = () => {
    const [videoPlayedSeconds, setVideoPlayedSeconds] = useState<number>(0)
    const [videoDuration, setVideoDuration] = useState<number>(0)
    const [isVideoPlaying, setisVideoPlaying] = useState<boolean>(false)

    useEffect(() => {
        setVideoPlayedSeconds(parseFloat(localStorage.getItem('playedSeconds') as string))
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

    const onPaueHandler = () => {
        setisVideoPlaying(false)

        console.log(playerRef.current?.getCurrentTime())
        
        localStorage.setItem('playedSeconds', JSON.parse(String(playerRef.current?.getCurrentTime()))) 
        
        setVideoPlayedSeconds(parseFloat( localStorage.getItem('playedSeconds') as string ))
        
        let lol = (localStorage.getItem('playedSeconds'))
        console.log(parseFloat(lol as string))
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
                Tenet</h5>

            <div className="movie_screen_wrapper">
                <ReactPlayer
                    ref={playerRef}
                    playing={false}
                    width={1280 / 2}
                    height={720 / 2}
                    controls={true}
                    onDuration={(media) => {
                        // console.log(media)
                    }}
                    onPlay={onPlayHandler}
                    onPause={onPaueHandler}
                    onProgress={(progress) => {
                        // console.log(progress.playedSeconds)
                        // localStorage.setItem('playedSeconds', JSON.parse(String(progress.playedSeconds)))
                    }}
                    onSeek={() => { 1000 }}
                    url="/movies/movie.mp4"
                    onReady={onReady}
                />
            </div>
        </>
    )
}

export default MovieScreen