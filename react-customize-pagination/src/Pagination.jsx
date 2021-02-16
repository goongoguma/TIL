import React, { useState, useEffect } from 'react';
import "./pagination.css";

function Pagination() {
  const [todo, setTodo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [minPageNumber, setMinPageNumber] = useState(0);
  const [maxPageNumber, setMaxPageNumber] = useState(5);
  const itemsPerPage = 5;
  const data = [];

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(json => setTodo(json));
  }, []);

  for (let i = 0; i < Math.ceil(todo.length / itemsPerPage); i++) {
    data.push(i + 1)
  };

  const handlePageClick = (event) => {
    setCurrentPage(+event.target.id);
  };

  const renderTodos = () => {
    const maxPage = itemsPerPage * currentPage;
    return (
      todo.slice(maxPage - itemsPerPage, maxPage).map(item => {
        return (
          <li key={item.id}>{item.title}</li>
        )
      })
    )
  };

  const renderPages = () => {
    return (
      data.map(num => {
        if (num > minPageNumber && num <= maxPageNumber) {
          return (
            <li
            key={num}
            id={num}
            className={currentPage === num ? 'selected-page': 'page'}
            onClick={handlePageClick}>
              {num}
            </li>
          )
        }
      })
    );
  };

  const handlePrev = () => {
    setCurrentPage(page => page - 1);

    if ((currentPage - 1) % itemsPerPage === 0) {
      setMinPageNumber(minPageNumber - itemsPerPage);
      setMaxPageNumber(maxPageNumber - itemsPerPage);
    }
  };

  const handleNext = () => {
    setCurrentPage(page => page + 1);

    if (currentPage + 1 > maxPageNumber) {
      setMinPageNumber(minPageNumber + itemsPerPage);
      setMaxPageNumber(maxPageNumber + itemsPerPage);
    }
  };

  const backToFirst = () => {
    setCurrentPage(1)
    setMinPageNumber(0);
    setMaxPageNumber(5)
  };

  const goToLast = () => {
    setCurrentPage(data.length);
    setMinPageNumber(data.length - itemsPerPage);
    setMaxPageNumber(data.length);
  };

  return (
    <div>
      <ul className='todo-list'>
        {renderTodos()} 
      </ul>
      <ul className='todo-page'>
        <button className='prev-button' onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
        { currentPage > itemsPerPage && <li className='first-page' onClick={backToFirst}>1&hellip;</li>}
        {renderPages()}
        { (currentPage < data.length - 4) && <li className='last-page' onClick={goToLast}>&hellip;{data.length}</li>}
        <button className='next-button' onClick={handleNext} disabled={currentPage === data.length}>Next</button>
      </ul>
    </div>
  )
}

export default Pagination
