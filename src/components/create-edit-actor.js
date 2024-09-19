import React, { useState,useEffect } from 'react';
import { Form ,Button} from 'react-bootstrap';
import {useLocation} from 'react-router-dom';

const CreateEditActor = (props) => {
  const location=useLocation();
  const[validated,setValidated]=useState(false);
  const[actor,setActor]=useState({
    id:0,
    name:'',
    dateOfBirth:undefined
  });

  useEffect(()=>{
    if(location.state && location.state.data && location.state.data.id>0){
      let personData=location.state.data;
      if(personData.dateOfBirth!=null && personData.dateOfBirth!==undefined){
        personData.dateOfBirth=personData.dateOfBirth.split('T')[0];
      }
      setActor(personData);
    }
    else{
      setActor({
        id:0,
        name:''
      })
    }
  },[]);

  const handleFieldChange = (event) => {
    var da=actor;
    da[event.target.name]=event.target.value;

    setActor(oldData=>{return{...oldData,...da}; });
  };

  const handleSave=(event)=>{
    event.preventDefault();
    const form=event.currentTarget;
    if(form.checkValidity()===false){
      event.stopPropagation();
      setValidated(true);
      return;
    }

    if(actor && actor.id>0){
      //update
      fetch('https://localhost:7087/api/Person',{
        method:"PUT",
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
        },
        body:JSON.stringify(actor)
      })
      .then(res=>res.json())
      .then(res=>{
        if(res.status===true && res.data){
          let personData=res.data;
          if(personData.dateOfBirth!==null && personData.dateOfBirth!==undefined){
            personData.dateOfBirth=personData.dateOfBirth.split('T')[0];
          }
          setActor(personData);
          alert('Updated Successfully');
        }
      })
      .catch(err=>alert('error in getting data'));
    }
    else{
      //create
      fetch('https://localhost:7087/api/Person',{
        method:"POST",
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
        },
        body:JSON.stringify(actor)
      })
      .then(res=>res.json())
      .then(res=>{
        if(res.status===true && res.data){
          let personData=res.data;
          if(personData.dateOfBirth!==null && personData.dateOfBirth!==undefined){
            personData.dateOfBirth=personData.dateOfBirth.split('T')[0];
          }
          setActor(personData);
          alert('created Successfully');
        }
      })
      .catch(err=>alert('error in getting data'));
    }
  }

  return (
    <>
            <Form noValidate validated={validated} onSubmit={handleSave}>
                <Form.Group controlId='formactorName'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        name='name' 
                        value={actor.name || ''} 
                        required 
                        type='text' 
                        autoComplete='off' 
                        placeholder="Enter Name" 
                        onChange={handleFieldChange} 
                    />
                    <Form.Control.Feedback type='invalid'>
                        Please Enter Movie Name
                    </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group controlId='formActorDateOfBirth'>
                    <Form.Label>Date Of Birth</Form.Label>
                    <Form.Control 
                        name='dateOfBirth' 
                        value={actor.dateOfBirth || ''} 
                        required 
                        type='date' 
                        placeholder="Enter date of birth" 
                        onChange={handleFieldChange} 
                    />
                    <Form.Control.Feedback type='invalid'>
                        Please Enter date of birth
                    </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit">{actor && actor.id > 0 ? "Update" : "Create"}</Button>
            </Form>
        </>
  )
}

export default CreateEditActor
