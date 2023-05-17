import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const API = "http://localhost:3001/books";
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "",
  });
  const [lastDeleted, setLastDeleted] = useState({});

  async function getBooks() {
    const res = await axios.get(API);
    setBooks(res.data);
  }

  async function deleteBook(id) {
    const res = await axios.delete(API + "/" + id);
    setLastDeleted(res.data);
    getBooks();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    await axios.post(API, form);
    getBooks();
    setForm({
      name: "",
      description: "",
      status: "",
    });
  }

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
    //???
  }

  return (
    <div className="App">
      <h1>Books? Books!</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          onChange={handleChange}
          value={form.name}
          placeholder="Book Title"
        />
        <input
          name="description"
          onChange={handleChange}
          value={form.description}
          placeholder="Book Description"
        />
        <input
          name="status"
          onChange={handleChange}
          value={form.status}
          placeholder="Book Status?"
        />
        <input name="submitBtn" type="submit" />
      </form>

      <br />
      <button onClick={getBooks}>Get Books</button>
      <button
        onClick={() => {
          const { name, description, status } = lastDeleted;
          setForm({ ...form, name, description, status });
        }}>
        Last Deleted
      </button>
      <bookBox>
        {books.map((book) => {
          return (
            <div className="book">
              <p className="title">{book.name}</p>
              <p className="description">{book.description}</p>
              <p>{book.status}</p>
              <p className="idNum">{book._id}</p>
              <p className="delete" onClick={() => deleteBook(book._id)}>
                Delete
              </p>
            </div>
          );
        })}
      </bookBox>
    </div>
  );
}

export default App;
