// Ensure JSDOM environment properties are present before executing test modules
if (typeof globalThis.window === 'undefined') {
  const { JSDOM } = require('jsdom');
  const dom = new JSDOM('<!DOCTYPE html><html><body><form id="create-task-form"><input type="text" name="new-task-description" id="new-task-description" /><button type="submit">Submit</button></form><ul id="task"></ul></body></html>');
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
}

const assert = require('assert');
const app = require('../index');

describe('HTML Forms - Tasklister Local Fallback Suite', () => {
  beforeEach(() => {
    const taskList = document.querySelector('#task');
    if (taskList) {
      taskList.innerHTML = '';
    }
    const inputField = document.querySelector('#new-task-description');
    if (inputField) {
      inputField.value = '';
    }
  });

  it('should verify buildToDo appends items correctly', () => {
    app.buildToDo('Buy Groceries');
    const taskList = document.querySelector('#task');
    assert.strictEqual(taskList.children.length, 1);
    assert.strictEqual(taskList.children[0].textContent, 'Buy Groceries');
  });

  it('should verify handleSubmit processes form events correctly', () => {
    const inputField = document.querySelector('#new-task-description');
    if (inputField) {
      inputField.value = 'Finish Assignment';
    }

    const mockEvent = {
      preventDefault: () => {},
      target: {
        reset: () => {},
        elements: {
          'new-task-description': { value: 'Finish Assignment' }
        }
      }
    };

    app.handleSubmit(mockEvent);
    const taskList = document.querySelector('#task');
    assert.ok(taskList.innerHTML.includes('Finish Assignment'));
  });
});
