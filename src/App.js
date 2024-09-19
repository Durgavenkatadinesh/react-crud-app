
import './App.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { BrowserRouter, Route,Link, Routes } from 'react-router-dom';

import Landing from './pages/landing';
import Actors from './pages/actors';
import MovieDetail from './components/movie-details';
import EditMovie from './components/edit-movie';
import ActorDetail from './components/actor-details'
import CreateEditActor from './components/create-edit-actor'

function App() {
  return (
    <Container>
      <BrowserRouter>
        {/* <Navbar bg='dark' variant='dark'>
        <Navbar.Brand as={Link} to="/">Movie World</Navbar.Brand>
        <Nav className='mr-auto'>
          <Nav.Link as={Link} to="/">Movies</Nav.Link>
          <Nav.Link as={Link} to="/actors">Actors</Nav.Link>
        </Nav>
        </Navbar> */}
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/details/:movieid' Component={MovieDetail}/>
          <Route path='/edit/:movieid' Component={EditMovie}/>
          <Route path='/actors' element={<Actors />} />
          <Route path='/actors/create-edit' Component={CreateEditActor}/>
          <Route path='/actors/details/:actorid' Component={ActorDetail}/>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
