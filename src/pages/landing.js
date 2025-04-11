import React,{useState} from 'react'
import { Col, Row } from 'react-bootstrap';
import Movielist from '../components/movie-list';
import CreateMovieModel from '../components/create-movie-model';

const Landing = () => {
    const [show, setShow] = useState(false)


//commited again before merging pr in main
//checking for git reset commit 
//done reset and updateingthe push
  return (
    <>
        <Row>
            <Col xs={12} md={10}>
                <h2>Movies</h2>
            </Col>
            <Col xs={12} md={2} className='align-self-center'>
                <button className='float-right'onClick={()=>setShow(true)}>Add new Movie</button>
            </Col>
        </Row>
        <Movielist />
        <CreateMovieModel show={show} handleClose={()=>setShow(false)}/>
    </>
  );
};

export default Landing
