//Library constructor
function Library(name) {
  this.name = name;
  this.shelves = [];// array of book locations
}

//Returns an array with all the book titles, author names, and shelf names
Library.prototype.report = function () {
  var result = [];
  for (var i = 0; i < this.shelves.length; i++){
    for (var j = 0; j < this.shelves[i].books.length; j++){
      result.push(this.shelves[i].books[j].lastName);
      result.push(this.shelves[i].books[j].firstName);
      result.push(this.shelves[i].books[j].title);
      result.push(this.shelves[i].name);
    }
  }
  return result;
};

//Shelf constructor
function Shelf(name, library) {
  this.name = name;
  this.books = [];
  library.shelves.push(this); // push new shelf to the library's shelves
  library.shelves.sort(compareName); //sort shelves in order by name property
 }

//Book constructor
function Book (lastName, firstName, title, library){
  this.title = title;
  this.firstName = firstName;
  this.lastName = lastName;
  var i = findWithProp (library.shelves, 'name', 'Unshelved'); // returns index of 'Unshelved'
  library.shelves[i].books.push(this); // push new book to the library's unshelved books
  library.shelves[i].books.sort(compareName);//sort unshelved
}

Book.prototype.enshelf = function (shelfName, library){
  i = findWithProp (library.shelves, 'name', 'Unshelved'); // returns index of 'Unshelved'
  var j = findWithProp (library.shelves, 'name', shelfName); // returns index of new shelf location
  var k = library.shelves[i].books.indexOf(this); // returns index of this book in unshelved area

  library.shelves[j].books.push(library.shelves[i].books[k]); //push book to new shelf location
  library.shelves[i].books.splice(k,1); // remove book from unshelved area
  library.shelves[j].books.sort(compareName); // sort books at new shelf location
};

Book.prototype.unshelf = function (shelfName, library){
  i = findWithProp (library.shelves, 'name', 'Unshelved');
  j = findWithProp (library.shelves, 'name', shelfName);
  k = library.shelves[j].books.indexOf(this);
  library.shelves[i].books.push(library.shelves[j].books[k]);
  library.shelves[j].books.splice(k,1);
  library.shelves[i].books.sort(compareName);
};

//For sorting alphabetically by name or last name with .sort()
function compareName (a, b){
  if (a.lastName && b.lastName){
    a = a.lastName;
    b = b.lastName;
  } else {
    a = a.name;
    b = b.name;
  }
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
}

//Returns the index of an object in an array based on the value of a property
function findWithProp(array, prop, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][prop] === value) {
            return i;
        }
    }
}

//Instantiate Library, Shelves, and Books for one library
var lib = new Library('Central Library');
var shelf1 = new Shelf('Unshelved',lib);
var shelf2 = new Shelf('History',lib);
var shelf3 = new Shelf('Literature',lib);
var shelf4 = new Shelf('Reference',lib);
var book1 = new Book ('Geronimo','Jake','History of Dry Erase Boards', lib);
var book2 = new Book ('McScratchys','T.G.I.','A Bridge Too Wide', lib);
var book3 = new Book ('Izmeen','Geraldine','Encyclopedia of Wasps Nests', lib);
var book4 = new Book ('Clarkbar','Clisby','A Road Too Far', lib);
var book5 = new Book ('Akshun','Cappem','A Tunnel Too Narrow', lib);
var book6 = new Book ('Yules','Jules','How to Make Mountain Stuff', lib);

//enshelf 5 of 6 books.
book1.enshelf('History', lib);
book2.enshelf('Literature', lib);
book3.enshelf('Reference', lib);
book4.enshelf('History', lib);
book5.enshelf('Literature', lib);

// move 1 book to a different shelf
book4.unshelf('History', lib);
book4.enshelf('Literature', lib);

//obtain report of all library books
var allBooks = lib.report();

//output to html table using jQuery
$(function showLib(){
  $("#libName").append('<h2>' + lib.name + '</h2>');
  $("#libTable").append('<tr><th align="left">Last Name</th>' +
    '<th align="left">First Name</th>' +
    '<th align="left">Title</th>' +
    '<th align="left">Shelf</th></tr>');
  for (var i = 0; i < allBooks.length; i+=4){
    $("#libTable").append(
      '<tr><td>' + allBooks[i] + '</td>' +
      '<td>' + allBooks[i+1] + '</td>' +
      '<td>' + allBooks[i+2] + '</td>' +
      '<td>' + allBooks[i+3] + "</td></tr>");
    }
  });