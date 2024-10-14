import axios from 'axios';

class BookAPI {
  constructor(baseURL) {
    this.axiosInstance = axios.create({
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 1, // Adjust this as necessary for your API
      },
    });
  }

  async findByKey(query) {
    try {
      const response = await this.axiosInstance.post('/search', {query});
      return response.data;
    } catch (error) {
      throw new Error('Error: ' + error.message);
    }
  }

  async findAll() {
    try {
      const response = await this.axiosInstance.get('/books');
      return response.data;
    } catch (error) {
      throw new Error('Error: ' + error.message);
    }
  }

  async update(book, shelf) {
    try {
      const response = await this.axiosInstance.put(`/books/${book.id}`, {book, shelf}); // Corrected template literal usage
      return response.data;
    } catch (error) {
      throw new Error('Error: ' + error.message);
    }
  }
}

const baseURL = "https://reactnd-books-api.udacity.com"; // Added const

export const API = new BookAPI(baseURL);
