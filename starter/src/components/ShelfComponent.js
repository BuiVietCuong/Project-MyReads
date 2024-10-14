import {BookComponent} from "./BookComponent";
import React from "react";

export const ShelfComponent = ({ books, shelf, update }) => {
  const filteredBooks = books.filter(
    book => shelf.value === book.shelf
  );

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {filteredBooks.map(book => (
            <BookComponent book={book} shelf={shelf.value} update={update} />
          ))}
        </ol>
      </div>
    </div>
  );
};