const todoInput = document.querySelector('.new-todo');
const todoListWrap = document.querySelector('.todo-list');
let todoList = [];
todoInput.addEventListener('keydown', (e) => {
  if(!todoInput.value) return;
  if(e.key === 'Enter'){
    let responseTodo = {
      text: todoInput.value,
      isSelected: false
    }
    todoList.push(responseTodo);
    window.localStorage.setItem('todoList', JSON.stringify(todoList));
    todoInput.value = '';
    createTodo(todoList.length-1);
  }
})

let listFromStorage = JSON.parse(localStorage.getItem('todoList'));
todoList = listFromStorage;
if(listFromStorage != null){
  for(let i = 0; i <= listFromStorage.length; i++){
    createTodo(i);
  }
}

function createTodo(num){
  const currentTodo = todoList[num];
  const li = document.createElement('li');
  li.innerHTML = `
    <div class="${currentTodo.isSelected ? 'completed' : 'view'}">
      <input class="toggle" type="checkbox" />
        <label>${currentTodo.text}</label>
      <button class="destroy"></button>
    </div>
  `;
  todoListWrap.prepend(li)
}