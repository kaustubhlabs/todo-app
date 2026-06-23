const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const emptyMessage = document.getElementById('empty-message');

const todos = [];

function renderTodos() {
  list.innerHTML = '';

  if (todos.length === 0) {
    emptyMessage.style.display = 'block';
    return;
  }

  emptyMessage.style.display = 'none';

  todos.forEach((todo, index) => {
    const item = document.createElement('li');
    item.className = 'todo-item';

    const text = document.createElement('p');
    text.className = `todo-text${todo.completed ? ' completed' : ''}`;
    text.textContent = todo.text;
    text.addEventListener('click', () => {
      todo.completed = !todo.completed;
      renderTodos();
    });

    const button = document.createElement('button');
    button.className = 'delete-btn';
    button.textContent = 'Delete';
    button.addEventListener('click', () => {
      todos.splice(index, 1);
      renderTodos();
    });

    item.appendChild(text);
    item.appendChild(button);
    list.appendChild(item);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = input.value.trim();

  if (!value) {
    return;
  }

  todos.push({ text: value, completed: false });
  input.value = '';
  renderTodos();
});

renderTodos();
