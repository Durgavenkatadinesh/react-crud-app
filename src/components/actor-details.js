import React, { useState, useEffect } from 'react';
import {Row,Col} from 'react-bootstrap'
import { Link, useParams } from "react-router-dom";

const ActorDetail = (props) => {
    const { actorid } = useParams();
    const [actor, setActor] = useState(null);
  
    useEffect(() => {
      fetch('https://localhost:7087/api/Person/' + actorid)
        .then(res => res.json())
        .then(res => {
          if (res.status === true) {
            setActor(res.data);
          }
        })
        .catch(err => alert("error in getting data"));
    }, [actorid]);
  
    return (
      <>
        <Row>
          {actor &&
            <>
              <Col item xs={12} md={8}>
                <h3>{actor.name}</h3>
                <div><b>Date Of Birth:</b> {actor.dateOfBirth ? actor.dateOfBirth.split('T')[0] : 'N/A'}</div>
                <div><b>Movie:</b> </div>
                <ul>{actor.movies && actor.movies.length > 0 ? actor.movies.map(x => <li>{x}</li>) : 'N/A'}</ul>
              </Col>
              <Col>
                <Link to="/actors">Go to Actor Page</Link>
              </Col>
            </>
          }
        </Row>
      </>
    );
}

export default ActorDetail
