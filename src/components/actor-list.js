import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const ActorList = () => {
  const [actors, setActors] = useState(null);
  const [actorsCount, setActorsCount] = useState(0);
  const [page, setPage] = useState(0);
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    // Get all actors
    getPerson();
  }, [page]);

  const getPerson = () => {
    fetch("https://localhost:7087/api/Person?pageIndex=" + page + "&pageSize=10")
      .then(res => res.json())
      .then(res => {
        if (res.status === true && res.data.count > 0) {
          setActors(res.data.person);
          setActorsCount(Math.ceil(res.data.count / 2)); // Adjusted since pageSize is hardcoded to 2
        } else if (res.data.count === 0) {
          alert("There is no actor data in the system");
        }
      })
      .catch(err => {
        console.error('Fetch error:', err);
        alert("Error getting data");
      });
  };

  const handlePageClick = (pageIndex) => {
    setPage(pageIndex.selected);
  };

  const deletePerson = (id) => {
    fetch("https://localhost:7087/api/Person?id=" + id, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        if (res.status === true) {
          alert(res.message);
          getPerson();
        }
      })
      .catch(err => alert("Error in getting data"));
  };

  return (
    <>
      {actors && actors.length > 0 ?
        <div>
          {actors.map((m, i) => (
            <Row key={i}>
              <Col>
                <div onClick={() => navigate('/actors/details/' + m.id)}><b><u>{m.name}</u></b></div>
                <br></br>
                <Button onClick={() => navigate('/actors/create-edit', { state: { data: m } })}>Edit</Button>{' '}
                <Button variant='danger' onClick={() => deletePerson(m.id)}>Delete</Button>
                <hr />
              </Col>
            </Row>
          ))}
        </div>
        : ""}

      <div className='d-flex justify-content-center'>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'page-link'}
          pageCount={actorsCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-link'}
          nextClassName={'page-link'}
          activeClassName={'active'}
        />
      </div>
    </>
  );
};

export default ActorList;
