import './css/style.css';

const okButton = document.getElementById('ok-button');
const input = document.getElementById('input');

const pinnedContainer = document.querySelector('.pinned_container');
const allTasksContainer = document.querySelector('.all_tasks_container');

const warning = document.querySelector('.warning');

const todos = [
  { id: 1, label: 'велосипед', pinned: true },
  { id: 2, label: 'велоремонт', pinned: false },
  { id: 3, label: 'ужин', pinned: false },
  { id: 4, label: 'домашка', pinned: false },
];

let id = 4;

function renderTodos(filteredItems) {
  pinnedContainer.innerHTML = `
    <p class='no_pinned_tasks'>No pinned tasks</p>
  `;

  allTasksContainer.innerHTML = '';

  const pinnedTodos = todos.filter((i) => i.pinned);
  if (!pinnedTodos.length) {
    document.querySelector('.no_pinned_tasks').classList.remove('hidden');
  } else {
    document.querySelector('.no_pinned_tasks').classList.add('hidden');
  }

  pinnedTodos.forEach((todo) => {
    const todoElement = document.createElement('div');
    todoElement.innerHTML = `<label><input class="todo_check" data-id="${todo.id}" type="checkbox" checked/>${todo.label}</label>`;

    pinnedContainer.append(todoElement);
  });

  let allItems = filteredItems;
  if (!allItems) allItems = todos;

  allItems.filter((i) => !i.pinned).forEach((todo) => {
    const todoElement = document.createElement('div');
    todoElement.innerHTML = `<label><input class="todo_check" data-id="${todo.id}" type="checkbox"/>${todo.label}</label>`;

    allTasksContainer.append(todoElement);
  });
}

okButton.addEventListener('click', (e) => {
  e.preventDefault();
  const newTodo = input.value;
  if (!newTodo) {
    warning.classList.remove('hidden');
    return;
  }
  warning.classList.add('hidden');

  id += 1;
  todos.push({ id, label: newTodo, pinned: false });
  renderTodos();

  input.value = '';
});

function onTodoChange(e) {
  if (!e.target.tagName === 'INPUT' || !e.target.classList.contains('todo_check')) return;

  const search = todos.filter((i) => i.id.toString() === e.target.dataset.id);
  search[0].pinned = e.target.checked;

  renderTodos();
}

allTasksContainer.addEventListener('change', onTodoChange);
pinnedContainer.addEventListener('change', onTodoChange);

input.addEventListener('input', (e) => {
  const value = e.target.value.toLowerCase();

  const filteredItems = todos.filter((i) => i.label.toLowerCase().startsWith(value));

  if (filteredItems.length) {
    renderTodos(filteredItems);
  } else {
    renderTodos();
  }
});

renderTodos();
