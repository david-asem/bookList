//Book class and construtor
class Book{
  constructor(title, author, isbn) {
     this.title = title;
this.author = author;
this.isbn = isbn;
  }
 
}

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');
    //create tr element
  const row = document.createElement('tr');
  
  //insert cols
  row.innerHTML = `<td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a>` ;
  list.appendChild(row);
    
  }

  showAlert(message, className) {
    //create div
  const div = document.createElement('div');
  //add classes
  div.className = `alert ${className}`;
  //add text
  div.appendChild(document.createTextNode(message));
  //get parent
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');

  //insert alert
  container.insertBefore(div, form);
  //timeout after 3s
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);

  }

  deleteBook(target) {
    if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
}
  }

  clearFields() {
    document.getElementById('title').value = "";
  document.getElementById('author').value = "";
  document.getElementById('isbn').value = "";
  }
}

//local storage class
class Store {
  static getBooksFromLS() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }
  static displayBooks() {
    
  }
  static addBookToLS(book) {
    const books = Store.getBooksFromLS();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
  
  static removeBook() {
    
  }
}

//event listeners
document.getElementById('book-form').addEventListener('submit', submit);



//submit fxn
function submit(event) {
  //get form values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;
  console.log(title, author, isbn);

  //instantiate book
  const book = new Book(title, author, isbn);

  //instaantiate UI
  const ui = new UI();

  //validate
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert('Please fill in the fields. Thank you', 'error')
  } else {
    //add book to list
    ui.addBookToList(book);

    //add to LS
    Store.addBookToLS(book);

    //show show success
    ui.showAlert('Book Added Successfully!', 'success');

    //

  //clear fields
  ui.clearFields(book);
  }


  event.preventDefault();
}

//Event listener for delete
document.getElementById('book-list').addEventListener('click', function (e) {
  const ui = new UI();
  ui.deleteBook(e.target)
  //show alert
  ui.showAlert('Book Removed!', 'success')
  e.preventDefault()
});