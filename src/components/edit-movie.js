import React, { useState,useEffect } from 'react';
import { Form } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';
import Button from 'react-bootstrap/Button';

const EditMovie = (props) => {
    const [movie, setMovie] = useState({});
    const [actors, setActors] = useState([]);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
      if(props.match !== undefined && props.match.params.movieid!==undefined )
      {
        fetch('https://localhost:7087/api/Movie/'+props.match.params.movieid)
        .then(res=>res.json())
        .then(res=>{
            if(res.status===true){
                setMovie(res.data);
                setActors(res.data.actors.map(x=>{return{value:x.id, label:x.name}}))
            }
        })
        .catch(err=>alert("error in getting data"));
      }
    }, [])
    

// not in use as coverimage is not usig now
    const handleFileUpload = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        const form = new FormData();
        form.append("imageFile", file);

        fetch(process.env.REACT_APP_API_URL + "uploadImage", {
            method: "POST",
            body: form
        })
        .then(res => res.json())
        .then(res => {
            if (res.status) {
                setMovie(oldData => ({
                    ...oldData,
                    coverImage: res.profileImage
                }));
            } else {
                alert("Error in file upload");
            }
        })
        .catch(err => alert("Error in file upload"));
    };

    const handleSave = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (!form.checkValidity()) {
            event.stopPropagation();
            setValidated(true);
            return;
        }
// for coverImage do change here and also change catch block
        const movieToPost = {
            ...movie,
            coverImage:movie.coverImage||"",
            actors: actors.map(x => x.value)
        };

        const method = movie.id > 0 ? "PUT" : "POST";
        const url = `https://localhost:7087/api/Movie`;

        fetch(url, {
            method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieToPost)
        })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(res => {
            if (res.status === true && res.data) {
                
                setMovie(res.data);
                alert(`${movie.id > 0 ? 'Updated' : 'Created'} successfully`);
            } else {
                alert("Error in processing the request");
            }
        })
        .catch(err => {
            err.json().then(errorData => {
                if (errorData.errors?.CoverImage) {
                    alert(errorData.errors.CoverImage[0]); // Display coverImage-specific error
                } else {
                    alert("Error in getting data");
                }
            });
        });
    };

    const handleFieldChange = (event) => {
        const { name, value } = event.target;
        setMovie(oldData => ({
            ...oldData,
            [name]: value
        }));
    };

    const promiseOptions = (inputValue) => {
        return fetch(`https://localhost:7087/api/Person/Search/${inputValue}`)
        .then(res => res.json())
        .then(res => {
            if (res.status === true && res.data.length > 0) {
                return res.data.map(x => ({ value: x.id, label: x.name }));
            } else if (res.data.count === 0) {
                alert("There is no actor matching this name");
                return [];
            }
        })
        .catch(err => alert("Error getting data"));
    };

    const multiselectChange = (data) => {
        setActors(data);
        setMovie(oldData => ({
            ...oldData,
            actors: data.map(x => ({ id: x.value, name: x.label }))
        }));
    };

    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSave}>
                {/* <Form.Group className='d-flex justify-content-center'>
                    {/* <Image width="200" height="200" src={movie?.coverImage || NoImage}/> 
                </Form.Group>
                <Form.Group className='d-flex justify-content-center'>
                    <div><input type='file' onChange={handleFileUpload} /></div>
                </Form.Group> */}
                <Form.Group controlId='formmovieTitle'>
                    <Form.Label>Movie Title</Form.Label>
                    <Form.Control 
                        name='title' 
                        value={movie?.title || ''} 
                        required 
                        type='text' 
                        autoComplete='off' 
                        placeholder="Enter Movie Name" 
                        onChange={handleFieldChange} 
                    />
                    <Form.Control.Feedback type='invalid'>
                        Please Enter Movie Name
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='formmovieDescription'>
                    <Form.Label>Movie Description</Form.Label>
                    <Form.Control 
                        name='description' 
                        value={movie?.description || ''} 
                        required 
                        as='textarea' 
                        rows={3} 
                        placeholder="Enter Movie Description" 
                        onChange={handleFieldChange} 
                    />
                </Form.Group>
                <Form.Group controlId='formmovieReleaseDate'>
                    <Form.Label>Release Date</Form.Label>
                    <Form.Control 
                        name='releaseDate' 
                        value={movie?.releaseDate || ''} 
                        required 
                        type='date' 
                        placeholder="Enter Movie Name" 
                        onChange={handleFieldChange} 
                    />
                    <Form.Control.Feedback type='invalid'>
                        Please Enter Movie release date
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='formmovieActors'>
                    <Form.Label>Actors</Form.Label>
                    <AsyncSelect 
                        cacheOptions 
                        isMulti 
                        value={actors} 
                        loadOptions={promiseOptions} 
                        onChange={multiselectChange} 
                    />
                </Form.Group>
                <Form.Group controlId='formmovieLanguage'>
                    <Form.Label>Movie Language</Form.Label>
                    <Form.Control 
                        name='language' 
                        value={movie?.language || ''} 
                        required 
                        type='text'  
                        placeholder="Enter Movie Language" 
                        onChange={handleFieldChange} 
                    />
                </Form.Group>
                <Button type="submit">{movie?.id > 0 ? "Update" : "Create"}</Button>
            </Form>
        </>
    );
};

export default EditMovie;
