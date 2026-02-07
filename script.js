const subjectInput = document.getElementById("subject");
const assignmentInput = document.getElementById("assignment");
const dueDateInput = document.getElementById("dueDate");
const taskList = document.getElementById("taskList");
const button = document.querySelector("button");

button.addEventListener("click", addTask);

function addTask(){
  const li = document.createElement("li");
  li.classList.add("task-item");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("task-checkbox");

  const textSpan = document.createElement("span");
  textSpan.textContent = `${subjectInput.value}: ${assignmentInput.value} (Due: ${dueDateInput.value})`;
  textSpan.classList.add("task-text");


  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.classList.add("task-delete-button");
   
 

  
  li.appendChild(checkbox);
  li.appendChild(textSpan);
  li.appendChild(deleteButton);

   deleteButton.addEventListener("click", () => {
    taskList.removeChild(li);
   });

  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed", checkbox.checked);
   });

   taskList.appendChild(li);
  

  subjectInput.value = "";
  assignmentInput.value = "";
  dueDateInput.value = "";
};
