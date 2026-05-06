import './Actor.css'
import {Carousel} from "react-bootstrap";
import {Paper} from '@mui/material';
import {faCirclePlay} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";

const Actor = ({movies}) => {

    const navigate = useNavigate();

    function reviews(movieId)
    {
        navigate(`/reviews/${movieId}`);
    }

    if (!movies?.length) return null;

    return (
        <div className='movie-carousel-container'>
            <Carousel>
                {
                    movies.map((movie) => {
                        return (
                            <Carousel.Item key={movie.imdbId ?? movie.id}>
                                <Paper>
                                    <div className='movie-carousel-card'>
                                        <div className='movie-card' style={{"--img":`url(${movie.backdrops[0]})`}}>
                                            <div className='movie-detail'>
                                                <div className='movie-poster'>
                                                    <img src={movie.poster} alt=""/>
                                                </div>
                                                <div className='movie-title'>
                                                    <h4>{movie.title}</h4>
                                                </div>
                                                <div className="movie-buttons-container">
                                                    <Link to={`/trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                                                        <div className="play-button-icon-container">
                                                            <FontAwesomeIcon className="play-button-icon"
                                                                         icon = {faCirclePlay}
                                                            />
                                                        </div>
                                                    </Link>
                                                    <div className="movie-review-button-container">
                                                        <Button variant ="info" onClick={() => reviews(movie.imdbId)} >Reviews</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Paper>
                            </Carousel.Item>
                        )
                    })
                }
            </Carousel>
        </div>
    )
}

export default Actor