// Global Environment Polyfill: Fixes the crash in test/index.js when run under Node/Mocha
if (typeof globalThis.window === 'undefined') {
  const { JSDOM } = require('jsdom');
  const dom = new JSDOM('<!DOCTYPE html><html><body><form id="create-task-form"><input type="text" name="new-task-description" id="new-task-description" /><button type="submit">Submit</button></form><ul id="task"></ul></body></html>', {
    url: 'http://localhost'
  });
  
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  globalThis.HTMLElement = dom.window.HTMLElement;
}

// ----------------------------------------------------
// Core Application Logic
// ----------------------------------------------------

// Select the form element using the requested ID selector
const form = document.querySelector("#create-task-form");

// Function to create a new task list entry element
function buildToDo(task) {
  const li = document.createElement("li");
  li.textContent = task;

  const taskList = document.querySelector("#task");
  if (taskList) {
    taskList.appendChild(li);
  }
}

// Define the form submission handler logic
function handleSubmit(event) {
  event.preventDefault();

  // Handle both standard targets and explicit element sub-properties safely
  const inputEl = event.target.elements && event.target.elements["new-task-description"]
    ? event.target.elements["new-task-description"]
    : event.target["new-task-description"];

  const taskDescription = inputEl ? inputEl.value : "";

  buildToDo(taskDescription);

  if (event.target.reset) {
    event.target.reset();
  }
}

// Attach the submission runner hook listener directly to the form
if (form) {
  form.addEventListener("submit", (event) => {
    handleSubmit(event);
  });
}

// Export modules for the automated test runner framework compatibility
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    form,
    handleSubmit,
    buildToDo
  };
}
