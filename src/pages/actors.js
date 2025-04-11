import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ActorList from '../components/actor-list';

const Actors = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically
  // hi
// hello
  const handleAddNewActor = () => {
    navigate('/actors/create-edit'); // Replaces props.history.push
  };

  return (
    <>
      <Row>
        <Col xs={12} md={10}>
          <h2>Actors</h2>
        </Col>
        <Col xs={12} md={2} className='align-self-center'>
          <Button className='float-right' onClick={handleAddNewActor}>
            Add new Actor
          </Button>
        </Col>
      </Row>

      <ActorList/>
    </>
  );
};

export default Actors;

