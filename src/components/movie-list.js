import React, { useState, useEffect } from 'react'
import Test from './test';
import MovieItem from './movie-item';
import ReactPaginate from 'react-paginate';

const Movielist = () => {
    const [movies, setMovies] = useState(null);
    const [moviesCount, setMoviesCount] = useState(0);
    const [page, setPage] = useState(0);

    useEffect(() => {
        //get all movies
        getMovies();
      }, [page]);

      const getMovies=()=>{
        fetch("https://localhost:7087/api/Movie?pageIndex=" + page + "&pageSize=10")
            .then(res => {
                console.log(res);
                return res.json();
            })
            .then(res => {
                if (res.status === true && res.data.count > 0) {
                    setMovies(res.data.movies);
                    setMoviesCount(Math.ceil(res.data.count / 2)); // Adjusted since pageSize is hardcoded to 2
                }

                if (res.data.count === 0) {
                    alert("There is no movie data in the system");
                }
            })
            .catch(err => {
                console.error('Fetch error:', err);
                alert("Error getting data");
            });

    }

    const handlePageClick=(pageIndex)=>{
        setPage(pageIndex.selected);
    }

    const deleteMovie=(id)=>{
        fetch("https://localhost:7087/api/Movie?id="+id,{
            method:"DELETE",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
        })
        .then(res=>res.json())
        .then(res=>{
            if(res.status===true){
                alert(res.message);
                getMovies();
            }
        })
        .catch(err=>alert("Error in getting data"));
    }

    return (
       <>
         {/* <Test /> */}

            { movies && movies !== [] ?
            movies.map((m,i)=><MovieItem key={i} data={m} deleteMovie={deleteMovie}/>)
            :""}

        <div className='d-flex justify-content-center'>
            <ReactPaginate 
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'page-link'}
                pageCount={moviesCount}
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
    )
}

export default Movielist




        // fetch(`${process.env.REACT_APP_API_URL}/Movie?pageIndex=${page}&pageSize=${10}`)
        // .then(res=>{
        //     //console.log(process.env.REACT_APP_PAGING_SIZE);
        //     console.log(res);
        //     return res.json()
        // })
        // .then(res=>{
        //     if(res.status === true && res.data.count >0){
        //         setMovies(res.data.movies);
        //         setMoviesCount(Math.ceil(res.data.count / process.env.REACT_APP_PAGING_SIZE));
        //     }

        //     if(res.data.count===0){
        //         alert("there is no movie data in system");
        //     }
        // })
        // .catch(err=>{
        //     //console.error('Fetch error:',err);
        //     alert("Error getting data");
        // });

