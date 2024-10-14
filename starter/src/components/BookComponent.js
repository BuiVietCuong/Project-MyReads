import React, { useState } from "react";


export const BookComponent = ({ book, shelf, update }) => {
  const [selectedShelf, setSelectedShelf] = useState(shelf || 'none');

  const { title, authors = [], imageLinks } = book;
  const thumbnail = imageLinks?.thumbnail || "icons/book-placeholder.svg";
  
  const shelfOptions = ['currentlyReading', 'wantToRead', 'read', 'none'].map(option => ({
    value: option,
    label: option.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
  }));

  const handleOnChange = (event) => {
    const sh = event.target.value;
    setSelectedShelf(sh);
    console.log("sh: ", book, sh)
    update(book, sh);
  };

  


  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}
          />
          <div className="book-shelf-changer">
            <select value={selectedShelf} onChange={handleOnChange}>
              <option value="move" disabled>Move to...</option>
              {shelfOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{!authors.length ? "" : authors.join("/ ")}</div>
      </div>
    </li>
  );
};

