const subjectInput = document.getElementById("subject");
const assignmentInput = document.getElementById("assignment");
const dueDateInput = document.getElementById("dueDate");
const taskList = document.getElementById("taskList");
const button = document.querySelector("button");


button.addEventListener("click", () => {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
 

  const text = document.createTextNode(`${subjectInput.value} - ${assignmentInput.value} (Due: ${dueDateInput.value})`);

  li.appendChild(checkbox);
  li.appendChild(text);

  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed", checkbox.checked);
   });

   taskList.appendChild(li);
  

  subjectInput.value = "";
  assignmentInput.value = "";
  dueDateInput.value = "";
});
