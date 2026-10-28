document.addEventListener("DOMContentLoaded", () => {
  // 1. Select the form and task list containers from the DOM
  const createTaskForm = document.getElementById("create-task-form") || document.querySelector("form");
  const taskListContainer = document.getElementById("tasks") || document.getElementById("task-list") || document.querySelector("ul");

  // Only proceed if both critical elements are found on the page
  if (createTaskForm && taskListContainer) {
    createTaskForm.addEventListener("submit", (event) => {
      // 2. Suppress the default form submission action to prevent page reload
      event.preventDefault();

      // 3. Locate the text input field containing the task description
      const taskInputField = document.getElementById("new-task-description") || createTaskForm.querySelector('input[type="text"]');
      
      if (taskInputField) {
        const taskText = taskInputField.value.trim();

        // 4. Ensure the input isn't blank before creating DOM structures
        if (taskText !== "") {
          // Create a new list item element
          const newListItem = document.createElement("li");
          
          // Inject the user's task string safely into the item
          newListItem.textContent = taskText;

          // Optional Stretch Goal: Add a built-in delete button to each task
          const deleteButton = document.createElement("button");
          deleteButton.textContent = " ✕";
          deleteButton.style.marginLeft = "10px";
          deleteButton.style.cursor = "pointer";
          deleteButton.style.color = "red";
          deleteButton.style.border = "none";
          deleteButton.style.background = "none";
          
          // Click listener to completely remove the specific task from the DOM
          deleteButton.addEventListener("click", () => {
            newListItem.remove();
          });
          
          // Append the delete button to the list item, then append the item to the list
          newListItem.appendChild(deleteButton);
          taskListContainer.appendChild(newListItem);

          // 5. Clear the input field so the user can easily type a fresh task
          createTaskForm.reset();
        }
      }
    });
  }
});
