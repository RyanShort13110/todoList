// getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

// onkeyup event
inputBox.onkeyup = _ =>{
  let userEnteredValue = inputBox.value; //getting user entered value
  if(userEnteredValue.trim() != 0){ //ensure entered val isn't just spaces
    addBtn.classList.add("active"); //activate the add button
  }else{
    addBtn.classList.remove("active"); // otherwise deactivate the add button
  }
}
showTasks(); //call showTask function

addBtn.onclick = _ =>{ //when user clicks the plus icon btn
  let userEnteredValue = inputBox.value; //grab the input field value
  let getLocalStorageData = localStorage.getItem("New Todo"); //getting localstorage
  if(getLocalStorageData == null){ //if localstorage has no data
    listArray = []; //create a blank array
  }else{
    listArray = JSON.parse(getLocalStorageData);  //transforming json string into a js object
  }
  listArray.push(userEnteredValue); //pushing or adding new value in array
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //transforming js object into a json string
  showTasks(); //calling the showTask function
  addBtn.classList.remove("active"); //deactivate the add button once the task added
}
function showTasks(){ //creating showTasks function
  let getLocalStorageData = localStorage.getItem("New Todo"); // grab new todo from local
  if(getLocalStorageData == null){ //if local storage is null
    listArray = []; //create new array
  }else{
    listArray = JSON.parse(getLocalStorageData); //otherwise create listArray with local data
  }
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; //passing the array length in pendingtask
  if(listArray.length > 0){ //if array length is greater than 0
    deleteAllBtn.classList.add("active"); //activate delete button
  }else{
    deleteAllBtn.classList.remove("active"); //otherwise deactivate delete button
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
  inputBox.value = ""; //once task added leave the input field blank
}

// delete task function
function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); //delete the li
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks(); //call the showTasks function
}

// delete all tasks function
deleteAllBtn.onclick = _ => {
  listArray = []; //empty the array
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //set the item in localstorage
  showTasks(); //call the showTasks function
}
