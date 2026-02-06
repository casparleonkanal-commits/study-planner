const subjectInput = document.getElementById("subject");
const assignmentInput = document.getElementById("assignment");
const dueDateInput = document.getElementById("dueDate");
const taskList = document.getElementById("taskList");
const button = document.querySelector("button");
const checkbox = document.createElement("input");
checkbox.type = "checkbox";

button.addEventListener("click", () => {
  const li = document.createElement("li");
  li.textContent = `${subjectInput.value} - ${assignmentInput.value} (Due: ${dueDateInput.value})`;
  li.appendChild(checkbox);
  li.addEventListener("change", () => {
    if (checkbox.checked) {
      li.classList.add("completed");
      li.style.textDecoration = "line-through";
      li.style.color = "gray";
    } else {
      li.classList.remove("completed");
      li.style.textDecoration = "none";
      li.style.color = "black";
    }
    console.log(`Task "${li.textContent}" is now ${checkbox.checked ? "completed" : "incomplete"}.`);
   });
  taskList.appendChild(li);

  subjectInput.value = "";
  assignmentInput.value = "";
  dueDateInput.value = "";
});
