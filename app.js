const toDoForm = document.querySelector("#todo-form");
const toDoList = document.querySelector("#todo-list");
const toDoInput = toDoForm.querySelector("input"); //toDoForm 안에 있는 input을 찾음
function painToDo(newToDo){
    const liCreate = document.createElement("li");
    const spanCreate = document.createElement("span");
    liCreate.appendChild(spanCreate); //span을 li안에 넣어줌 <li> <span> </span> </li> 이런 식으로. 왜냐하면 나중에 할일을 삭제하는 버튼도 만들 것이기 때문
    spanCreate.innerText = newToDo;
    toDoList.appendChild(liCreate);
}
function handleToDoSubmit(event) {
  event.preventDefault(); //자동 새로고침 되는 것을 막아줌
  const newToDo = toDoInput.value; //추가한 할일을 newToDo에 저장함
  toDoInput.value = "" //할일을 하나 추가하면 추가하는 칸의 값을 비워줌, 새로운 값을 넣을 수 있도록
  painToDo(newToDo);
}

toDoForm.addEventListener("submit", handleToDoSubmit);