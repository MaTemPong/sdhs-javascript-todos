
const getLocal = () => JSON.parse(localStorage.getItem('todoList')) || [];
const setLocal = (data) => localStorage.setItem('todoList', JSON.stringify(data));

const todoInput = document.querySelector('.new-todo');
const clearCompletedBtn = document.querySelector('.clear-completed');
const todoCount = document.querySelector(".todo-count>strong");
const filters = document.querySelectorAll(".filters a")
let todoListWrap = document.querySelector('.todo-list');
let todoList = [];
let filterTodoList = [];
let currentURL = "";
todoInput.addEventListener('keydown', (e) => {
  if(!todoInput.value) return;
  if(e.key === 'Enter'){
    let responseTodo = {
      text: todoInput.value,
      isSelected: false
    }
    todoList.push(responseTodo);
    setLocal(todoList);
    todoInput.value = '';
    reloadTodo()
  }
});

filters.forEach((item, index) => {
  item.addEventListener('click', ()=>{
    currentURL = item.href.split("#/")[1];
    reloadTodo();
  })
});  

clearCompletedBtn.addEventListener('click', ()=>{
  todoList = todoList.filter((todo) => !todo.isSelected)
  setLocal(todoList);
  reloadTodo();
})


reloadTodo(); 


function reloadTodo(){
  todoList = getLocal();
  if(currentURL === ""){
    filterTodoList = todoList;   
  } else if(currentURL === "completed"){
    filterTodoList = todoList.filter((todo) => todo.isSelected)
  } else if(currentURL === "active"){
    filterTodoList = todoList.filter((todo) => !todo.isSelected)
  }
  todoListWrap.replaceChildren();
  if(filterTodoList != null){
    for(let i = 0; i < filterTodoList.length; i++){
      createTodo(i);
    }
  }
}

function createTodo(num){
  const currentTodo = filterTodoList[num];
  const li = document.createElement('li');
  if(currentTodo.isSelected)
    li.classList.add('completed')
  li.innerHTML = `
    <div class="view">
      <input class="toggle" type="checkbox" ${currentTodo.isSelected? "checked" : ""}/>
        <label>${currentTodo.text}</label>
      <button class="destroy"></button>
    </div>
  `;
  todoListWrap.prepend(li);
  todoCount.textContent = filterTodoList.length;
  li.querySelector('.destroy').addEventListener('click', ()=>{
    todoList.splice(currentTodo, 1);
    setLocal(todoList);
    
    reloadTodo();
  });

  li.querySelector('.toggle').addEventListener('change', ()=>{
    if(li.querySelector('.toggle').checked) currentTodo.isSelected = true;
    else currentTodo.isSelected = false;

    setLocal(todoList);
    reloadTodo();
  })

  const input = document.createElement('input');
  li.querySelector('label').addEventListener('dblclick', ()=>{
    if(li.querySelector('view+input')) return;
    li.classList = [];
    li.classList.add('editing');
    input.classList.add('edit')
    input.setAttribute('type', 'text');
    input.value = currentTodo.text;
    li.querySelector('.view').after(input);
    input.focus();
  })

  input.addEventListener('blur', () => {
    currentTodo.text = input.value;
    li.querySelector('label').textContent = input.value;
    input.remove();
    li.classList.remove('editing');
    if(currentTodo.isSelected)
      li.classList.add('completed')
    setLocal(todoList);
    reloadTodo();
  })
}