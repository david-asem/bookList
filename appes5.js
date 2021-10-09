//Book construtor
function Book(title, author, isbn) {
  this.title = title;
this.author = author;
this.isbn = isbn;
}


//UI constructor
function UI() { }

//Add book to list
UI.prototype.addBookToList = function (book) {
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

//show alert
UI.prototype.showAlert = function (message, className) {
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

//clear fields
UI.prototype.clearFields = function () {
  document.getElementById('title').value = "";
  document.getElementById('author').value = "";
  document.getElementById('isbn ').value = "";
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

  //clear fields
  ui.clearFields(book);
  }


  event.preventDefault();
}