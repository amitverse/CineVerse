package dev.amit.movie;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    public ReviewRepository reviewRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Review createReview(String reviewPayload, String id) {
        Review review = reviewRepository.insert(new Review(reviewPayload));

        mongoTemplate.update(Movie.class)
                .matching(Criteria.where("imdbId").is(id))
                .apply(new Update().push("reviewIds").value(review.getId()))
                .first();

        return review;
    }

    public Optional<List<Review>> getReviewsForMovie(String imdbId) {
        return movieRepository.getByImdbId(imdbId)
                .map(m -> {
                    List<Review> listData = m.getReviewIds();
                    return listData != null ? listData : List.of();
                });
    }
}
