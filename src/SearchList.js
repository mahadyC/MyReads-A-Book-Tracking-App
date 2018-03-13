import React, { Component } from 'react';
import ShelfControl from './ShelfControl';

class SearchList extends Component {

	render() {

		const searchedBookShelfUpdated = getUpdatedSearchedBook(this.props.searchedBook, this.props.shelfBooks);
		
		function getUpdatedSearchedBook(searchedBook, shelfBooks) {
			searchedBook.shelf = "none"
			let store = searchedBook
			
			shelfBooks.find(function(shelfBook) {
				if(shelfBook.id === searchedBook.id) {
					searchedBook.shelf = shelfBook.shelf
					return store = searchedBook
				}
			})
			console.log(store)
			return store
		}

		return (
			<li key={searchedBookShelfUpdated.id}>
				<ShelfControl onSelectionChange={this.props.control} book={searchedBookShelfUpdated} />
			</li>    
		)
	}
}

export default SearchList;