import React, { Component } from 'react';
import './ShelfControl.css';

class ShelfControl extends Component {
	
  initialBook = this.props.book

  state = {
    bookShelf: this.initialBook.shelf 
  }

	handleChange = (event) => {
		// setState keeps the control button up to date according to changed value
		this.setState({bookShelf: event.target.value})

		// Provide the changed selection value to the book object
		let shelf = event.target.value
		this.props.onSelectionChange(this.initialBook, shelf )
	}
	
	render() {

		return(
			<div className="book">
				<div className="book-top">
					<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.initialBook.imageUrl})` }}></div>
					<div className="book-shelf-changer">
						<select value={this.state.bookShelf} onChange={this.handleChange}>
							<option value="" disabled>Move to...</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>
				<div className="book-title">{this.initialBook.title}</div>
				<div className="book-authors">{this.initialBook.author}</div>
			</div>	
		)
	}
}


export default ShelfControl;