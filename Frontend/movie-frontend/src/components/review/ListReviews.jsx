import {useState} from 'react';
import api from '../../api/axiosConfig';
import {Button, Row, Col} from 'react-bootstrap';
import React from 'react';

/**
 * Button + list: loads reviews via GET /api/v1/reviews/:imdbId and shows them.
 */
const ListReviews = ({movieId, reviews, setReviews}) => {
    const [loadError, setLoadError] = useState(null);
    const [loadingAll, setLoadingAll] = useState(false);

    const loadAllReviews = async () => {
        if (!movieId) return;
        setLoadError(null);
        setLoadingAll(true);
        try {
            const {data} = await api.get(
                `/api/v1/reviews/${encodeURIComponent(movieId)}`
            );
            setReviews(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
            setLoadError('Could not load reviews. Try again.');
        } finally {
            setLoadingAll(false);
        }
    };

    function reviewRowKey(r, index) {
        const raw = r?.id ?? r?._id;
        if (raw == null) return `review-fallback-${index}`;
        if (typeof raw === 'string') return raw;
        if (typeof raw === 'object' && raw.$oid != null) return raw.$oid;
        return `review-fallback-${index}`;
    }

    return (
        <>
            <Row className="mb-3">
                <Col>
                    <Button
                        variant="outline-primary"
                        onClick={loadAllReviews}
                        disabled={loadingAll}
                    >
                        {loadingAll ? 'Loading…' : 'Show all reviews'}
                    </Button>
                    {loadError && (
                        <span className="text-danger ms-2">{loadError}</span>
                    )}
                </Col>
            </Row>
            {reviews?.map((r, index) => (
                <React.Fragment key={reviewRowKey(r,index)}>
                    <Row>
                        <Col>{r.body}</Col>
                    </Row>
                    <Row>
                        <Col>
                            <hr />
                        </Col>
                    </Row>
                </React.Fragment>
            ))}
        </>
    );
};

export default ListReviews;