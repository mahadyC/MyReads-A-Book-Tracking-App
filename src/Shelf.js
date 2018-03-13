import React, { Component } from 'react';
import ShelfControl from './ShelfControl';
import './Shelf.css';

class Shelf extends Component {

	handleStateChange = (changedBook, newShelf) => {

		this.props.handleControl(changedBook, newShelf);
	}

	render() {
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{this.props.title}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{this.props.shelfBooks.map(book => (
							<li key={book.id}>
								<ShelfControl onSelectionChange={this.handleStateChange} book={book}/>
							</li>
						))}
					</ol>
				</div>
			</div>
		)
	}	
}

export default Shelf;