const todoInput = document.querySelector('.new-todo');
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
    loadList();
    todoInput.value = '';
  }
})

const loadList = () => {
  const listFromStorage = JSON.parse(localStorage.getItem('todoList'));
  console.log('눌림')
  console.log(listFromStorage)
  for(let i = 0; i <= listFromStorage.length; i++){
  }
}

loadList();