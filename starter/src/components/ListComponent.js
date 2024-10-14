import React from 'react';
import {ShelfComponent} from "./ShelfComponent"; // Ensure the path is correct
import { Link } from "react-router-dom";

export const ListComponent = ({ shelfs, books, update }) => {
  // Normalize books to ensure it's always an array
  const booksArray = Array.isArray(books) ? books : (books ? Object.values(books).flat() : []);
  console.log(books, "aa", books.Array)

  return (
    <div className="list-books">

      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      {booksArray.length === 0 && <h1>0 book.</h1>}
      <div className="list-books-content">
        {shelfs.map(shelf => {
          const filteredBooks = booksArray.filter(book => book.shelf === shelf.value);
          return (
            <ShelfComponent
              books={filteredBooks}
              shelf={shelf}
              update={update}
            />
          );
        })}
      </div>
      <div className="open-search">
        <Link to="/search">
          <label>Add a book</label>
        </Link>
      </div>
    </div>
  );
};

