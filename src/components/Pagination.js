import React from "react";

const Pagination = ({moviesPerPage, allMovies, paginate}) => {

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allMovies / moviesPerPage); i++) {
    pageNumbers.push(i);
  }

    return (
        <nav style={{ color: 'blue', position:'relative', margin: 'auto'}}>
            <ul className="pagination"> 
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number)} href="#!" className="page-link">{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination;