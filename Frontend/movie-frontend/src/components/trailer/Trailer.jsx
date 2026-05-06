// import {useParams} from 'react-router-dom';
// import ReactPlayer from 'react-player';
// import './Trailer.css';
//
// import React, {useEffect, useState} from 'react'
//
// const Trailer = () => {
//
//     let params = useParams();
//     let key = params.ytTrailerId;
//
//     const [playing, setPlaying] = useState(false);
//
//     return (
//         <div className="react-player-container">
//             <button type="button" onClick={() => setPlaying(true)}>
//                 Play trailer
//             </button>
//             {(key!=null)?<ReactPlayer controls={true} playing={playing} onPause={() => setPlaying(false)} muted url ={`https://www.youtube.com/watch?v=${key}`}
//                                       width = '100%' height='100%' />:null}
//         </div>
//     )
// }
//
// export default Trailer




import { Link, useParams } from "react-router-dom";
import "./Trailer.css";

const Trailer = () => {
    const { ytTrailerId } = useParams();

    if (!ytTrailerId) {
        return (
            <div className="react-player-container">
                <Link to="/">← Home</Link>
                <p>Missing trailer id.</p>
            </div>
        );
    }

    return (
        <div className="react-player-container">
            <Link to="/">← Home</Link>

            <div className="embed-wrap">
                <iframe
                    title="Trailer"
                    src={`https://www.youtube.com/embed/${ytTrailerId}?autoplay=1&mute=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                />
            </div>

            <p className="trailer-external">
                <a
                    href={`https://www.youtube.com/watch?v=${ytTrailerId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Open on YouTube
                </a>
            </p>
        </div>
    );
};

export default Trailer;