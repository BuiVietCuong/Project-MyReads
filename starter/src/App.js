import "./App.css";
import {ListComponent} from "./components/ListComponent";
import Search from "./components/SearchComponent";
import { API } from "./controller/API";
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
      await API.update(book, shelf);
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
        const results = await API.findByKey(query);
        setFindBooks(results.books);
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
        const data = await API.findAll();
        console.log("bbb", books)
        setBooks(data.books);
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
