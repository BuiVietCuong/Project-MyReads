import "./App.css";
import { getAll, search, update } from "./BooksAPI";
import {ListComponent} from "./components/ListComponent";
import Search from "./components/SearchComponent";
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

function App() {
  const [books, setBooks] = useState([]);
  const [findBooks, setFindBooks] = useState([]);

  const bookShelfs = [
    { value: "currentlyReading", title: "Currently Reading" },
    { value: "wantToRead", title: "Want to Read" },
    { value: "read", title: "Read" },
  ];

  const updateBook = async (book, shelf) => {
    try {
      await update(book, shelf);
      setBooks((oldBook) => {
        console.log("pre:==== ", oldBook)
        const updatedBooks = oldBook.filter((b) => b.id !== book.id);
        return shelf === "none" ? updatedBooks : [...updatedBooks, { ...book, shelf }];
      });
    } catch {
      console.error("Error updating book");
    }
  };

  const findByQuery = async (query) => {
    if (query.trim() !== "") {
      try {
        const results = await search(query);
        if (Array.isArray(results)) setFindBooks(results);
        else setFindBooks([]);
      } catch {
        setFindBooks([]);
        console.error("Error searching for books");
      }
    } else {
      setFindBooks([]);
    }
  };

  const resetFind = () => setFindBooks([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAll();
        console.log("bbb", books)
        setBooks(data);
      } catch {
        console.error("Error fetching books");
      }
    };

    fetchBooks();
  }, books || []);


  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <ListComponent 
              books={books} 
              shelfs={bookShelfs} 
              update={updateBook} 
            />
          }
        />
        <Route
          path="/search"
          element={
            <Search
              onFind={findByQuery}
              update={updateBook}
              onResetSearch={resetFind}
              findBooks={findBooks}
              books={books}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
