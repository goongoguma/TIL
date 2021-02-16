import React, { useState, useEffect } from 'react';
import './style.css';

const renderData = data => {
  return (
    <ul>
      {data.map((todo, index) => {
        return <li key={index}>{todo.title}</li>
      })}
    </ul>
  )
}

function PaginationComponent() {
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);
  
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const pages = [];
  for(let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  };

  const indexOfLastItem = currentPage * itemsPerPage; 
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; 
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  }; 

  const renderPageNumbers = pages.map(number => {
    if (number <= maxPageNumberLimit && number > minPageNumberLimit) {
        return ( 
          <li 
            key={number} 
            id={number} 
            onClick={handleClick} 
            className={currentPage === number ? "active" : null}>
            {number}
          </li>
      )
    } else {
      return null;
    }
  });

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => setData(json));
  }, []);

  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    };
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    };
  };

  let pageIncrementBtn = null;

  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}>&hellip;</li>
  };

  let pageDecrementBtn = null;

  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}>&hellip;</li>;
  }

  return (
    <>
      <h1>Todo List</h1><br /> 
      {renderData(currentItems)}
      <ul className='pageNumbers'>
        <li>
          <button onClick={handlePrevbtn} disabled={currentPage === pages[0] ? true : false}>
            Prev
          </button>
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}
        <li>
          <button onClick={handleNextbtn} disabled={currentPage === pages[pages.length - 1] ? true : false}>
            Next
          </button>
        </li>
      </ul>
    </>
  )
}

export default PaginationComponent
