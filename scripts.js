//Set up library
let myLibrary = [];

/* //Constructor for book objects
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function (readVal) {
  console.log(`Read val was: ${this.read}`);
  this.read = readVal;
  console.log(`Now it is: ${this.read} for the book ${this.title}`);
}; */

//Using class instead for creating book objects
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  toggleRead(readVal) {
    console.log(`Read val was: ${this.read}`);
    this.read = readVal;
    console.log(`Now it is: ${this.read} for the book ${this.title}`);
  }
}

//Create a few books
let theHobbit = new Book("The Hobbit", "J.R.R Tolkien", "295", "No");

let gameOfThrones = new Book(
  "A Game of Thrones",
  "George R.R. Martin",
  "694",
  "Yes"
);

let harryPotter = new Book(
  "Harry Potter and the Philosopher's Stone",
  "J. K. Rowling",
  "223",
  "Yes"
);

//Add them to the library
myLibrary.push(theHobbit);
myLibrary.push(gameOfThrones);
myLibrary.push(harryPotter);

function populateStorage() {
  //Set up library
  let myLibrary = [];
  //Add them to the library
  myLibrary.push(theHobbit);
  myLibrary.push(gameOfThrones);
  myLibrary.push(harryPotter);
  console.log(myLibrary);
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}
populateStorage();

//Grab the container we we will be attaching the books to
const libContainer = document.querySelector(".lib-container");

//Add the books we currently have to the webpage

//myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
console.log(myLibrary);
for (let i = 0; i < myLibrary.length; i++) {
  let bookId = i;
  let title = myLibrary[i].title;
  let author = myLibrary[i].author;
  let pages = myLibrary[i].pages;
  let read = myLibrary[i].read;
  createBook(title, author, pages, read, bookId);
}

//Important to add an eventlistener so we can delete books!
libContainer.addEventListener("click", (event) => deleteBook(event));

//Remove the book element from the dom and the array
function deleteBook(event) {
  if (event.target.className == "delete-book") {
    console.log(`You clicked the delete button! ${event.currentTarget}`);
    const bookToDltId = event.target.parentElement.getAttribute("data-bookid");
    console.log(bookToDltId);

    const bookToDlt = event.target.parentElement;
    console.log(bookToDlt);
    libContainer.removeChild(bookToDlt);

    //Now to remove the book from the library array
    console.log(myLibrary);
    myLibrary.splice(bookToDltId, 1);

    //Update the data-bookid number on the book article elements
    const bookElements = document.getElementsByTagName("article");

    for (let i = 0; i < bookElements.length; i++) {
      bookDataId = bookElements[i].getAttribute("data-bookid");
      console.log(bookDataId);
      bookElements[i].setAttribute("data-bookid", i);

      const getFieldSet = bookElements[i].querySelector(".read");
      console.log(getFieldSet);

      const labelYes = getFieldSet.firstChild;
      console.log(labelYes);
      labelYes.htmlFor = `YesBookId:${i}`;

      const inputYes = labelYes.nextSibling;
      console.log(inputYes);
      inputYes.id = `YesBookId:${i}`;
      inputYes.name = `BookId:${i}`;

      const labelNo = inputYes.nextSibling;
      console.log(labelNo);
      labelNo.htmlFor = `NoBookId:${i}`;
      const inputNo = labelNo.nextSibling;
      inputNo.id = `NoBookId:${i}`;
      inputNo.name = `BookId:${i}`;
    }

    console.log(myLibrary);
  }
}

//Add a listener for when a user clicks on the read it? radio buttons
libContainer.addEventListener("click", (event) => changeRead(event));

//
function changeRead(event) {
  if (event.target.type == "radio") {
    console.log("Hey we clicked a radio input type!");
    const newReadVal = event.target.value;
    console.log(`The clicked radio button choice was: ${newReadVal}`);
    const bookToChange =
      event.target.parentElement.parentElement.getAttribute("data-bookid");
    console.log(
      `The index for the book we want to change in the library array: ${bookToChange}`
    );
    myLibrary[bookToChange].toggleRead(newReadVal);
  }
}

//This will be how we add a new book visually to the webpage
function createBook(title, author, pages, read, bookId) {
  let articleElement = document.createElement("article");
  articleElement.setAttribute("data-bookId", bookId);
  libContainer.appendChild(articleElement);

  let h2Element = document.createElement("h2");
  h2Element.classList.add("book-title");
  h2Element.textContent = title;
  articleElement.appendChild(h2Element);

  let pElement1 = document.createElement("p");
  pElement1.classList.add("author");
  pElement1.textContent = `Author: ${author}`;
  articleElement.appendChild(pElement1);

  let pElement2 = document.createElement("p");
  pElement2.classList.add("pages");
  pElement2.textContent = `Pages: ${pages}`;
  articleElement.appendChild(pElement2);

  let pElement3 = document.createElement("p");
  pElement3.textContent = `Read it?`;
  articleElement.appendChild(pElement3);

  let fieldsetElement = document.createElement("fieldset");
  fieldsetElement.classList.add("read");
  articleElement.appendChild(fieldsetElement);

  let labelYes = document.createElement("label");
  labelYes.htmlFor = `YesBookId:${bookId}`;
  labelYes.textContent = "Yes";
  //labelYes.setAttribute("for", "yes");
  fieldsetElement.appendChild(labelYes);

  let inputYes = document.createElement("input");
  inputYes.type = "radio";
  inputYes.id = `YesBookId:${bookId}`;
  inputYes.value = "Yes";
  inputYes.name = `BookId:${bookId}`;
  fieldsetElement.appendChild(inputYes);

  let labelNo = document.createElement("label");
  labelNo.htmlFor = `NoBookId:${bookId}`;
  labelNo.textContent = "No";
  //labelYes.setAttribute("for", "yes");
  fieldsetElement.appendChild(labelNo);

  let inputNo = document.createElement("input");
  inputNo.type = "radio";
  inputNo.id = `NoBookId:${bookId}`;
  inputNo.value = "No";
  inputNo.name = `BookId:${bookId}`;
  fieldsetElement.appendChild(inputNo);

  console.log(read);

  //Check if user has read the book and check the answer so it displays the choice
  if (read == "Yes") {
    inputYes.checked = true;
  } else {
    inputNo.checked = true;
  }

  let dltBtn = document.createElement("button");
  dltBtn.textContent = "Delete Book";
  dltBtn.classList.add("delete-book");
  articleElement.appendChild(dltBtn);
}

//Grab the new book button so we can add a listener to it
const bookBtn = document.querySelector(".add-book");

bookBtn.addEventListener("click", function showForm() {
  console.log("This button is working");
  form.classList.toggle("hide");
});

//Grab the form so we can manipulate that
const form = document.querySelector(".form");

//Grab the close button so we can add a listener to it
const closeBtn = document.querySelector(".close-icon");

closeBtn.addEventListener("click", () => {
  console.log("Close button has been clicked");
  form.classList.toggle("hide");
});

//Grab the submit button so we can add a listener to it
const submitBtn = document.querySelector(".submitBtn");

submitBtn.addEventListener("click", addBookToLibrary);

//Here is how we add book to the library and close the add new book popup
function addBookToLibrary() {
  const titleInputElement = document.getElementById("title");
  let titleInput = titleInputElement.value;
  //console.log(`${titleInput}`);

  const authorInputElement = document.getElementById("author");
  let authorInput = authorInputElement.value;
  //console.log(`${authorInput}`);

  const pagesInputElement = document.getElementById("pages");
  let pagesInput = pagesInputElement.value;
  //console.log(`${pagesInput}`);

  let radioEl = document.getElementsByName("read");
  //console.log(radioEl);

  let didRead = "No";

  for (let i = 0; i < radioEl.length; i++) {
    console.log("We are in the for loop!");
    if (radioEl[i].checked) {
      didRead = radioEl[i].value;
    } else {
      console.log("It didnt work!");
    }
  }

  console.log(`${didRead}`);

  let newBook = new Book(titleInput, authorInput, pagesInput, didRead);
  console.log(newBook);

  myLibrary.push(newBook);
  console.log(myLibrary);

  //Now lets update the book id to be the index in the array
  let bookId = myLibrary.length - 1;

  createBook(titleInput, authorInput, pagesInput, didRead, bookId);

  //Hide the form again
  form.classList.toggle("hide");

  //Reset the field values and the radio buttons
  titleInputElement.value = "";
  authorInputElement.value = "";
  pagesInputElement.value = "";

  for (let i = 0; i < radioEl.length; i++) {
    radioEl[i].checked = false;
  }
}
