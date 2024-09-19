import React from 'react'
import { Modal } from 'react-bootstrap'
import EditMovie from './edit-movie'
const CreateMovieModel = (props) => {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
            <Modal.Title>Add new Movie</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <div>this is body</div>
            <EditMovie />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default CreateMovieModel
