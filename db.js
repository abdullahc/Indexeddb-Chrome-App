var html5rocks = {};
html5rocks.indexedDB = {};


html5rocks.indexedDB.db = null;

html5rocks.indexedDB.open = function() {
  var version = 1;
  var request = indexedDB.open("todos", version);

  // We can only create Object stores in a versionchange transaction.
  request.onupgradeneeded = function(e) {
    var db = e.target.result;

    // A versionchange transaction is started automatically.
    e.target.transaction.onerror = html5rocks.indexedDB.onerror;

    e.target.transaction.onabort = function(e) {
      console.log("abort: " + e.target.error.message);
    };

    if(db.objectStoreNames.contains("todo")) {
      db.deleteObjectStore("todo");
    }

    var store = db.createObjectStore("todo",
      {keyPath: "timeStamp"});
  };

  request.onsuccess = function(e) {
    html5rocks.indexedDB.db = e.target.result;
    html5rocks.indexedDB.getAllTodoItems();
  };

  request.onerror = html5rocks.indexedDB.onerror;
};






html5rocks.indexedDB.open = function() {
  var version = 1;
  var request = indexedDB.open("todos", version);

  // We can only create Object stores in a versionchange transaction.
  request.onupgradeneeded = function(e) {
    var db = e.target.result;

    // A versionchange transaction is started automatically.
    e.target.transaction.onerror = html5rocks.indexedDB.onerror;

    if(db.objectStoreNames.contains("todo")) {
      db.deleteObjectStore("todo");
    }

    var store = db.createObjectStore("todo",
      {keyPath: "timeStamp"});
  };

  request.onsuccess = function(e) {
    html5rocks.indexedDB.db = e.target.result;
    html5rocks.indexedDB.getAllTodoItems();
  };

  request.onerror = html5rocks.indexedDB.onerror;
};



html5rocks.indexedDB.addTodo = function(todoText) {


  console.log("processsing inside the html5rocks namespace html5rocks.indexedDB.addTodo");
  var db = html5rocks.indexedDB.db;
  console.log("Here is the database:"+ db);
  var trans = db.transaction(["todo"], "readwrite");
  var store = trans.objectStore("todo");
  console.log("Here is the store:"+ store);
  var request = store.put({
    "text": todoText,
    "timeStamp" : new Date().getTime()
  });

  console.log("here is the request" + request);

  request.onsuccess = function(e) {
    // Re-render all the todo's
    html5rocks.indexedDB.getAllTodoItems();
  };

  request.onerror = function(e) {
    console.log(e.value);
  };
};



html5rocks.indexedDB.getAllTodoItems = function() {
  var todos = document.getElementById("todoItems");
  todos.innerHTML = "";

  var db = html5rocks.indexedDB.db;
  var trans = db.transaction(["todo"], "readwrite");
  var store = trans.objectStore("todo");

  // Get everything in the store;
  var keyRange = IDBKeyRange.lowerBound(0);
  var cursorRequest = store.openCursor(keyRange);

  cursorRequest.onsuccess = function(e) {
    var result = e.target.result;
    if(!!result == false)
      return;

    renderTodo(result.value);
    result.continue();
  };

  cursorRequest.onerror = html5rocks.indexedDB.onerror;
};




function renderTodo(row) {
  var todos = document.getElementById("todoItems");
  var li = document.createElement("li");
  var a = document.createElement("a");
  var t = document.createTextNode();
  t.data = row.text;

  a.addEventListener("click", function(e) {
    html5rocks.indexedDB.deleteTodo(row.text);
  });

  a.textContent = " [Delete]";
  li.appendChild(t);
  li.appendChild(a);
  todos.appendChild(li);
}



html5rocks.indexedDB.deleteTodo = function(id) {
  var db = html5rocks.indexedDB.db;
  var trans = db.transaction(["todo"], "readwrite");
  var store = trans.objectStore("todo");

  var request = store.delete(id);

  request.onsuccess = function(e) {
    html5rocks.indexedDB.getAllTodoItems();  // Refresh the screen
  };

  request.onerror = function(e) {
    console.log(e);
  };
};



function addTodo() {
  var todo = document.getElementById('todo');

  console.log("trying to get to to the html indexedDB");
  html5rocks.indexedDB.addTodo(todo.value);
  console.log("called to the html5rocks add todo");
  todo.value = '';
  console.log("cleared out the to do value");
}


function init() {
  html5rocks.indexedDB.open(); // open displays the data previously saved
}

html5rocks.indexedDB.onerror = function(){

    console.log("encountered an error:");

};

window.addEventListener("DOMContentLoaded", init, false);


