import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [movieName, setMovieName] = useState('');
  const [movieReview, setMovieReview] = useState('');
  const [movieReviewList, setMovieReviewList] = useState([]);
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((res) => {
      setMovieReviewList(res.data)
    });
  }, []);

  const submitReview = () => {
    Axios.post('http://localhost:3001/api/insert', {
      movieName, 
      movieReview
    })
      
    setMovieReviewList([...movieReviewList, {movieName, movieReview}])
  };

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  };

  const updateReview = (name) => {
    Axios.put('http://localhost:3001/api/update', {
      movieName: name,
      movieReview: newReview
    });
    setNewReview('');
  };

  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
      <div className='form'>
        <label>Movie Name:</label>
        <input type='text' name='movieName' 
          onChange={e => setMovieName(e.target.value)}
        />
        <label>Movie Name:</label>
        <input type='text' name='review' 
          onChange={e => setMovieReview(e.target.value)} 
        />

        <button onClick={submitReview}>Submit</button>

        {
          movieReviewList.map(val => (
            <div className='card' key={val.id}>
              <h1 >{val.movieName}</h1>
              <p>{val.movieReview}</p>
              <button onClick={() => deleteReview(val.movieName)}>Delete</button>
              <div>
                <input type='text' id='updateInput' onChange={e => setNewReview(e.target.value)}/>
                <button onClick={() => updateReview(val.movieName)}>Update</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
