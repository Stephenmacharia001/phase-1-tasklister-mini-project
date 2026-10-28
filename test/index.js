// conect fromm html to javascript 
const form = document.querySelector("#create-task-form");
//Define the form submssion handler logic
function handleSubmit(event) {
    // Prevent the default HTML form page refresh behavior
    event.preventDefault();
    // use the target name attribute 'new-task-description" to gather the text input data 
    const taskDescription = event.target["new-task-description"].value;
    buildToDo(taskDescription);
    event.target.reset()
}
//function to create a new task list entry element
function buildToDo(task) {
    //create a brand new list item element
    const li = document.createElement("li");
    //set the content of the element to the task string 
    li.textContent = task;
    //find the task list target element using the required ID selector
    const taskList = document.querySelector("#task");
    // append the list item to rhe existing task list container 
    if (taskLict) {
        taskList.appendChild(li);
    }
}

//attach the submission runner hook listener directlyto the slected form 

if (form) { 
    form.addEventListener("submit", (event) => {
        handleSubmit(event);
    });
}
//Export modules for the Jest automated test suite compatibility
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        form,
        handleSubmit,
        buildTodo
    };
}