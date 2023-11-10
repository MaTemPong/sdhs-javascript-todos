
const getLocal = () => JSON.parse(localStorage.getItem('todoList')) || [];
const setLocal = (data) => localStorage.setItem('todoList', JSON.stringify(data));

const todoInput = document.querySelector('.new-todo');
let todoListWrap = document.querySelector('.todo-list');
let todoList = [];
todoInput.addEventListener('keydown', (e) => {
  if(!todoInput.value) return;
  if(e.key === 'Enter'){
    let responseTodo = {
      text: todoInput.value,
      isSelected: false,
      idx: todoList.length
    }
    console.log(responseTodo.idx)
    todoList.push(responseTodo);
    setLocal(todoList);
    todoInput.value = '';
    createTodo(todoList.length-1);
  }
});

reloadTodo(); 


function reloadTodo(){
  todoList = getLocal();
  if(todoList != null){
    for(let i = 0; i < todoList.length; i++){
      createTodo(i);
    }
  }
}

function createTodo(num){
  const currentTodo = todoList[num];
  const li = document.createElement('li');
  if(currentTodo.isSelected)
    li.classList.add(currentTodo.isSelected)
  li.innerHTML = `
    <div class="view">
      <input class="toggle" type="checkbox" />
        <label>${currentTodo.text}</label>
      <button class="destroy"></button>
    </div>
  `;
  todoListWrap.prepend(li);
  li.querySelector('.destroy').addEventListener('click', ()=>{
    li.remove();
    todoList.splice(currentTodo.idx, 1);
    setLocal(todoList);
  });
  li.querySelector('.toggle').addEventListener('checked', ()=>{currentTodo.isSelected = true})
}