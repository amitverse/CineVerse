package dev.amit.movie;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/")
public class MovieController {

    @Autowired
    private MovieService movieService;
    public String greetingMessage;

    public String getGreetingMessage () {
        return "Welcome to the Movie World";
    }

    @GetMapping
    public ResponseEntity<String> greetings (){
        return new ResponseEntity<String>(getGreetingMessage(), HttpStatus.OK);
    }


    @GetMapping("/api/v1/movies")
    public ResponseEntity<List<Movie>> getAllMovies () {
        return new ResponseEntity<List<Movie>>(movieService.allMovie(), HttpStatus.OK);
    }


    @GetMapping("/api/v1/movies/title/{title}")
    public ResponseEntity<Optional<Movie>> getMovieByTitle (@PathVariable String title) {
        return new ResponseEntity<Optional<Movie>>(movieService.movieByTitle(title), HttpStatus.OK);
    }

    @GetMapping("/api/v1/movies/id/{id}")
    public ResponseEntity<Optional<Movie>> getMovieById (@PathVariable String id) {
        return new ResponseEntity<Optional<Movie>>(movieService.movieByImdbId(id), HttpStatus.OK);
    }
}
