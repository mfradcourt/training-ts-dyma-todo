import './style/style.css';
import {Todo} from "./interfaces/todo.interface";

const ul = document.querySelector('ul')!;
const form = document.querySelector('form')!;
const input = document.querySelector<HTMLInputElement>('form > input')!;

form.addEventListener('submit', (event: Event) => {
  event.preventDefault();

  const value = input.value;
  input.value = '';

  addTodo(value);
});

const todos: Todo[] = [
  {
    text: 'je suis une todo',
    done: false,
    editMode: true
  },
  {
    text: 'faire du JavaScript',
    done: true,
    editMode: false
  }
];

const displayTodo = () => {
  const todosNode = todos.map((todo: Todo, index: number) => {
    if (todo.editMode) {
      return createTodoEditElement(todo, index);
    } else {
      return createTodoElement(todo, index);
    }
  });

  ul.innerHTML = '';
  ul.append(...todosNode);
};

const createTodoElement = (todo: Todo, index: number) => {
  const li = document.createElement('li');
  const buttonDelete = document.createElement('button');
  buttonDelete.innerHTML = 'Supprimer';
  buttonDelete.addEventListener('click', (event) => {
    event.stopPropagation();
    deleteTodo(index);
  });

  const buttonEdit = document.createElement('button');
  buttonEdit.innerHTML = 'Editer';
  buttonEdit.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleEditMode(index);
  });

  li.innerHTML = `
    <span class="todo ${ todo.done ? 'done' : '' }"></span>
    <p>${ todo.text }</p>
  `;
  li.addEventListener('click', (event) => {
    toggleTodo(index);
  });
  li.append(buttonEdit, buttonDelete);

  return li;
};

const createTodoEditElement = (todo: Todo, index: number) => {
  const li = document.createElement('li');
  const input = document.createElement('input');
  input.type = 'text';
  input.value = todo.text;

  const buttonSave = document.createElement('button');
  buttonSave.innerHTML = 'Save';
  buttonSave.addEventListener('click', (event) => {
    event.stopPropagation();
    editTodo(index, input);
  });

  const buttonCancel = document.createElement('button');
  buttonCancel.innerHTML = 'Cancel';
  buttonCancel.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleEditMode(index);
  });

  li.append(input, buttonCancel, buttonSave);

  return li;
};

const addTodo = (text: string) => {
  todos.push({
    text,
    done: false,
    editMode: false
  });
  displayTodo();
};

const deleteTodo = (index:  number) => {
  todos.splice(index, 1);
  displayTodo();
}

const toggleTodo = (index: number) => {
  todos[index].done = !todos[index].done;
  displayTodo();
};

const toggleEditMode = (index: number) => {
  todos[index].editMode = !todos[index].editMode;
  displayTodo();
};

const editTodo = (index: number, input: HTMLInputElement) => {
  todos[index].text = input.value;
  todos[index].editMode = false;

  displayTodo();
};

displayTodo();