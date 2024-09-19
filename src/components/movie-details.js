import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";

const MovieDetail = () => {
  const { movieid } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch('https://localhost:7087/api/Movie/' + movieid)
      .then(res => res.json())
      .then(res => {
        if (res.status === true) {
          setMovie(res.data);
        }
      })
      .catch(err => alert("error in getting data"));
  }, [movieid]);

  return (
    <>
      <Row>
        {movie &&
          <>
            <Col item xs={12} md={4}>
              <img src={movie.coverImage } style={{width:300, height:300}}/>
            </Col>
            <Col item xs={12} md={8}>
              <h3>{movie.title}</h3>
              <p>{movie.description || 'N/A'}</p>
              <div><b>Language</b></div>
              <div>{movie.language}</div>
              <div><b>Release Date:</b> {movie.releaseDate ? movie.releaseDate.split('T')[0] : 'N/A'}</div>
              <div><b>Cast:</b> {movie.actors && movie.actors.length > 0 ? movie.actors.map(x => x.name).join(", ") : 'N/A'}</div>
            </Col>
            <Col>
              <Link to="/">Go to Home Page</Link>
            </Col>
          </>
        }
      </Row>
    </>
  );
}

export default MovieDetail;
