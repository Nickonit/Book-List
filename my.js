//Book Constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI Constructor
function UI() {}

//Add Book To list
UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');
    //create tr element
    const row = document.createElement('tr');
    //insert cols
    row.innerHTML = `
        <!--<td>${book.title}</td>-->
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">x<a></td>
    `;
    list.appendChild(row);
}

//show Alert
UI.prototype.showAlert = function(message, className) {
    //create div
    const div = document.createElement('div');
    //add class
    div.className = `alert ${className}`;
    //create text node
    div.appendChild(document.createTextNode(message));
    //get parent
    const card = document.querySelector('.card');
    const form = document.querySelector('#book-form');
    //insert alert
    card.insertBefore(div, form);

    //timeout after 3 sec
    setTimeout(function(){
        document.querySelector('.alert').remove();
    },3000);
}


//delete book
UI.prototype.deleteBook = function(target)

{
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}
//clear Fields
UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}




//Event Listener
document.getElementById('book-form').addEventListener('submit',
    function(e)
    {

    //get from values
   const title = document.getElementById('title').value,
         author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value

   //instantiate book
   const book = new Book(title, author, isbn);

   //intentiate ui object
        const ui = new UI();

            //validate
            if(title === '' || author === '' || isbn === '')
            {
                //error alert
                ui.showAlert('Please Fill All The Fields', 'alert-danger');
            }else
                {
                //add book to list
                ui.addBookToList(book);
                //success alert
                ui.showAlert('One Book Added', 'alert-success');
                //clear field
                ui.clearFields();
            }
   e.preventDefault();
});

//Event listner for delete
document.getElementById('book-list').addEventListener('click', function(e) {

    //intentiate ui object
    const ui = new UI();

    ui.deleteBook(e.target);

    //show massege
    ui.showAlert('One Book Deleted', 'alert-info');
    e.preventDefault()
})