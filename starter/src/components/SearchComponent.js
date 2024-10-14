import {BookComponent} from "./BookComponent";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Search = ({ findBooks, books, onFind, onResetSearch, update }) => {
  const [query, setQuery] = useState("");
  const [updateSearchBooks, setUpdateSearchBooks] = useState([]);

  useEffect(() => {
    const newSearchBooks = findBooks.map((book) => {
      const existingBook = books.find((b) => b.id === book.id);
      return {
        ...book,
        shelf: existingBook ? existingBook.shelf : "none",
      };
    });

    console.log("newSearchBooks: ", newSearchBooks)
    setUpdateSearchBooks(newSearchBooks);


  }, [findBooks, books]);

  const handleQueryUpdate = (event) => {
    const queryValue = event.target.value;
    setQuery(queryValue);
    onFind(queryValue);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/">
          <label className="close-search" onClick={onResetSearch}>
            Close
          </label>
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={handleQueryUpdate}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {updateSearchBooks.length > 0 ? (
            updateSearchBooks.map((book) => (
              <BookComponent key={book.id} book={book} shelf={book.shelf} update={update} />
            ))
          ) : (
            <p>Not found.</p>
          )}
        </ol>
      </div>
    </div>
  );
};

export default Search;
