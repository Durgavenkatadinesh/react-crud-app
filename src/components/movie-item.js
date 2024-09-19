import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import NoImage from './no-image.png';

const MovieItem = (props) => {
    const navigate = useNavigate();

    const handleSeeDetails = () => {
        navigate(`/details/${props.data.id}`);
    };

    const handleEdit = () => {
        navigate(`/edit/${props.data.id}`);
        console.log("Movie ID: ",props.data.id);
    };

    const handleDelete = () => {
        props.deleteMovie(props.data.id);
    };

    return (
        <>
            <Row>
                <Col xs={12} md={2}>
                    <img src={props.data.coverImage || NoImage} style={{ width: 150, height: 150 }} alt="Movie Cover" />
                </Col>
                <Col xs={12} md={10}>
                    <div><b>{props.data.title}</b></div>
                    <div>Actors: {props.data.actors.map(x => x.name).join(", ")}</div>
                    <Button onClick={handleSeeDetails}>See Details</Button>{' '}
                    <Button onClick={handleEdit}>Edit</Button>{' '}
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                </Col>
                <Col>
                    <hr />
                </Col>
            </Row>
        </>
    );
}

export default MovieItem;
