import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import Shelf from './Shelf';
import SearchList from './SearchList';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';
import './App.css';

class MyReads extends Component {

  state = {
    books : [],
    query: '',
    searchedBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((bookList) => {

      let allBooks = bookList.map(function(book) {
        return {
          id: book.id,
          title: book.title,
          author: (book.authors) ? book.authors : "No author",
          shelf: book.shelf,
          imageUrl: (book.imageLinks) ? book.imageLinks.smallThumbnail : "No thumbnail"
        }
      });
      this.setState({books: allBooks});
    })
  }

  updateQuery = (query) => {

    this.setState({query: query})
    query ?
    BooksAPI.search(query.trim(), 20).then((bookList) => {

      if(Array.isArray(bookList)) {

        let allBooks = bookList.map(function(book) {
          if(book.imageLinks) {
            return {
              id: book.id,
              title: book.title,
              author: (book.authors) ? book.authors : "No author",
              shelf: book.shelf,
              imageUrl: (book.imageLinks) ? book.imageLinks.smallThumbnail : "No thumbnail"
            }
          } else {
              return {
                id: book.id,
                title: book.title,
                author: (book.authors) ? book.authors : "No author",
                shelf: book.shelf,
                imageUrl: ''
              }
          }
        })
        this.setState({searchedBooks: allBooks})
      }
    }) : ""
  }

  handleControl = (changedBook, newShelf) => {

    let allBooks = {}

    allBooks = this.state.books.map(function(book) {
          if(book.id === changedBook.id){
            return {
              id: changedBook.id,
              title: changedBook.title,
              author: changedBook.author,
              shelf: newShelf,
              imageUrl: changedBook.imageUrl
            }
        } else {
            return {
              id: book.id,
              title: book.title,
              author: (book.authors) ? book.authors : "No author",
              shelf: book.shelf,
              imageUrl: (book.imageLinks) ? book.imageLinks.smallThumbnail : "No thumbnail"
            }
          }
        })
    this.setState({books: allBooks})

    BooksAPI.update(changedBook, newShelf).then((updatedBookShelves) => {

      BooksAPI.getAll().then(bookList => {
        allBooks = bookList.map(function(book) {
          if(book.id === changedBook.id){
            return {
              id: book.id,
              title: book.title,
              author: book.authors,
              shelf: newShelf,
              imageUrl: (book.imageLinks) ? book.imageLinks.smallThumbnail : "No thumbnail"
            }
        } else {
            return {
              id: book.id,
              title: book.title,
              author: book.authors,
              shelf: book.shelf,
              imageUrl: (book.imageLinks) ? book.imageLinks.smallThumbnail : "No thumbnail"
            }
          }
        })
        this.setState({books: allBooks})
      })

      BooksAPI.getAll().then((bookList) => {

        let allTheBooks = bookList.map(function(book) {
          return {
            id: book.id,
            title: book.title,
            author: (book.authors) ? book.authors : "No author",
            shelf: book.shelf,
            imageUrl: (book.imageLinks) ? book.imageLinks.smallThumbnail : "No thumbnail"
          }
        });
        this.setState({books: allTheBooks});
      })

    })
  }

  render() {
    let shelves = [
      {
        id: 'currentlyReading',
        title: 'Currently Reading',
        books: this.state.books.filter((book) => book.shelf === 'currentlyReading')
      },
      {
        id: 'wantToRead',
        title: 'Want to Read',
        books: this.state.books.filter(book => book.shelf === 'wantToRead')
      },
      {
        id: 'read',
        title: 'Read',
        books: this.state.books.filter(book => book.shelf === 'read')
      }
    ]

    let showingBooks
    if(this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i');
      showingBooks = this.state.searchedBooks.filter((book) => match.test(book.title) || match.test(book.author))
    } else {
      showingBooks = []
    }

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyRead</h1>
            </div>
            <div className="list-books-content">
              {shelves.map(shelf => (
                <Shelf id={shelf.id} title={shelf.title} shelfBooks={shelf.books} handleControl={this.handleControl} key={shelf.id} />
              ))}
            </div>
            <div className="open-search">
              <Link to="search">Go to search page</Link>
            </div>
          </div>
        )}></Route>

        <Route exact path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search"></Link>
              <input type="text" placeholder="search by title or author" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)}></input>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {showingBooks.map(searchedBook => (
                <SearchList shelfBooks={this.state.books} searchedBook={searchedBook} control={this.handleControl} key={searchedBook.id}/>
                ))}
              </ol>
            </div>

          </div>
        )}></Route>
      </div>
    );
  }
}

export default MyReads;
