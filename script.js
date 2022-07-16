function openmodel() {
  document.getElementById("pop-up").style.display = "flex";
  document.querySelector(".overlay").style.opacity = "1";
}
document.addEventListener("mouseup", function (e) {
  var cont = document.getElementById("pop-up-form");
  if (!cont.contains(e.target)) {
    document.getElementById("pop-up").style.display = "none";
    document.querySelector(".overlay").style.opacity = "0";
  }
});
const bookshelf = document.querySelector(".bookshelf");
let books = JSON.parse(localStorage.getItem("books")) || [];
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}
let x=1;
const form = document.querySelector("#form");
function addBook(i) {
  var brea1 = document.createElement("br");
  var addbo = document.getElementById("add-book");
  let booknode = document.createElement("div");
  
  booknode.classList.add("book");
  booknode.setAttribute("data-index", `${i}`);
  
  const title = document.getElementById("title").value;
  let titlenode = document.createElement("h2");
  titlenode.innerHTML = `Title: ${title}`;

  const author = document.getElementById("author").value;
  let authornode = document.createElement("h3");
  authornode.innerHTML = `Author: ${author}`;

  const pages = document.getElementById("pages").value;
  let pagesnode = document.createElement("h3");
  pagesnode.innerHTML = `Pages: ${pages}`;

  const read = document.getElementById("pages").value;
  let readnode = document.createElement("h3");
  readnode.innerHTML = `Read? ${read}${read === "Yes" ? "😃" : "🗿"}`;

  let updatenode = document.createElement("button");
  updatenode.classList = "update";
  updatenode.innerHTML = `Update <i class="fas fa-pen"></i>`;

  let trashNode = document.createElement("button");
  trashNode.classList = "trash";
  trashNode.innerHTML = `Delete <i class="fas fa-trash-alt">`;

  const book = new Book(title, author, pages, read);
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));
  booknode.appendChild(titlenode);
  booknode.appendChild(authornode);
  booknode.appendChild(pagesnode);
  booknode.appendChild(readnode);
  booknode.appendChild(updatenode);
  booknode.appendChild(trashNode);
  bookshelf.appendChild(booknode);
  document.getElementById("pop-up").style.display = "none";
  document.querySelector(".overlay").style.opacity = "0";
  form.reset();
//  update read/unread status
  updatenode.addEventListener("click",()=>{
    if(readnode.innerHTML==="Read? No🗿"){
      readnode.innerHTML = "Read? Yes😃";
      book.read = "Yes";
      localStorage.setItem("books",JSON.stringify(books));
    }
    else{
      readnode.innerHTML = "Read? No🗿";
      book.read = "No";
      localStorage.setItem("books",JSON.stringify(books));
    }
  });
  
//  delete books
  trashNode.addEventListener("click",()=>{
    bookshelf.removeChild(booknode);
    books.splice(booknode,1);
    localStorage.setItem("books",JSON.stringify(books));
  });
}
function getBooks() {
  books.forEach(function (book, i) {
    let bookNode = document.createElement("div");
    bookNode.classList.add("book");
    bookNode.setAttribute("data-index", `${i}`);

    const title = document.getElementById("title").value;
    let titleNode = document.createElement("h2");
    titleNode.innerHTML = `Title: ${book.title}`;

    const author = document.getElementById("author").value;
    let authorNode = document.createElement("h3");
    authorNode.innerHTML = `Author: ${book.author}`;

    const pages = document.getElementById("pages").value;
    let pageNode = document.createElement("h3");
    pageNode.innerHTML = `Pages: ${book.pages}`;

    const read = document.getElementById("read").value;
    let readNode = document.createElement("h3");
    readNode.innerHTML = `Read? ${book.read}${
        book.read === "Yes" ? "😃" : "🗿"
    }`;

    let updateNode = document.createElement("button");
    updateNode.classList = "update";
    updateNode.innerHTML = `Update <i class="fas fa-pen"></i>`;

    let trashNode = document.createElement("button");
    trashNode.classList = "trash";
    trashNode.innerHTML = `Delete <i class="fas fa-trash-alt">`;

    bookNode.appendChild(titleNode);
    bookNode.appendChild(authorNode);
    bookNode.appendChild(pageNode);
    bookNode.appendChild(readNode);
    bookNode.appendChild(updateNode);
    bookNode.appendChild(trashNode);
    bookshelf.appendChild(bookNode);

    // update book status
    updateNode.addEventListener("click", () => {
      if (readNode.innerHTML === "Read? No🗿") {
        readNode.innerHTML = "Read? Yes😃";
        book.read = "Yes";
        localStorage.setItem("books", JSON.stringify(books));
      } else {
        readNode.innerHTML = "Read? No🗿";
        book.read = "No";
        localStorage.setItem("books", JSON.stringify(books));
      }
    });
    // delete book
    trashNode.addEventListener("click", () => {
      bookshelf.removeChild(bookNode);
      books.splice(bookNode, 1);
      localStorage.setItem("books", JSON.stringify(books));
    });
  });
}
window.addEventListener("load", getBooks);
form.addEventListener("submit",(e,i)=>{
  e.preventDefault();
  addBook(i);
})
