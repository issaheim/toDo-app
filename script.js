"use strict";

//Inport the two div´s from HTML
const root = document.getElementById("root");
const container = document.getElementById("container");

// Create headline
const h1 = document.createElement("h1");
h1.innerHTML = "To do";

// Creat a new div for the input field 
const inputContainer = document.createElement("div")
inputContainer.id = "inputContainer";

// Create inputfield with an id and a placeholder text
const newInput = document.createElement("input");
newInput.id = "newInput"
newInput.placeholder = "Add a to-do"

// Create the add button with an id
const addBtn = document.createElement("button");
addBtn.textContent = "";
addBtn.id = "addBtn";

// Adds the created elements to the DOM
container.appendChild(h1);
inputContainer.append(newInput);
inputContainer.appendChild(addBtn);

container.append(inputContainer);

// Creates the ul and defult list with an id
let toDo = ["Sleep", "Fix that bug", "Make cookies", "Buy milk"];

let toDoList = document.createElement("ul");
toDoList.id = "toDoList"

// Store the array
if (localStorage.getItem("toDoLocal") == null){
  localStorage.setItem("toDoLocal", JSON.stringify(toDo));
  console.log("array finns");
}

// Function for adding a new task
function submit(){
  let getToDoList = JSON.parse(localStorage.getItem("toDoLocal")); //Hämta min array
  console.log(getToDoList);
  getToDoList.push(newInput.value); // Lägger in ny todo

  localStorage.setItem("toDoLocal", JSON.stringify(getToDoList)); // Sparar ner ny todo array

  printList();
  newInput.value = "";
  console.log(toDo);
}

// Adds the new input to the list when button is clicked
addBtn.addEventListener("click", function(){
  submit();
});

// Adds the new input to the list when enter is clicked
newInput.addEventListener("keyup", function(e){
  console.log("test")
  if (e.keyCode === 13){
    console.log("test2");
    submit();
    e.preventDefault();
  }
});

// Clears ul and adds new, updated array with id´s for each item
function printList(){
  toDoList.innerHTML = "";
  let newToDoList = JSON.parse(localStorage.getItem("toDoLocal"));
  console.log(newToDoList);

  for (let items in newToDoList){
    toDoList.insertAdjacentHTML("afterbegin","<li id='" + newToDoList[items] + "'><input type='checkbox' class='check'><p>" + newToDoList[items] + " </p></li>");
  };
};

printList();

container.appendChild(toDoList);



// Remove checked items from toDoList array
toDoList.addEventListener("change", function(e){
  console.log(e);

  let getToDoList = JSON.parse(localStorage.getItem("toDoLocal")); //Hämta min array

  if (e.target.checked == true){
    console.log("check");
    console.log(e.target.parentElement.id);
    
    let toRemove = getToDoList.indexOf(e.target.parentElement.id);
    let newList = getToDoList.splice(toRemove, 1);
    console.log(toRemove);

    localStorage.setItem("toDoLocal", JSON.stringify(getToDoList)); //Spara array

    printList();
  }
})