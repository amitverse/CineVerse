import Actor from "../actor/Actor.jsx";

const Home = ({movies}) => {
    return (
        <div>
            <Actor movies={movies}/>
        </div>
    )
}

export default Home