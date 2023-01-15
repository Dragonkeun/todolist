const toDoForm = document.querySelector("#todo-form");
const toDoList = document.querySelector("#todo-list");
const toDoInput = toDoForm.querySelector("input"); //toDoForm 안에 있는 input을 찾음

function deleteToDo(event) {
  const deleteLi = event.target.parentElement; //할일이 5개라고 가정했을 때, 어떤 할일을 클릭했는지 알 수 있도록 해줌, parentElement : 클릭된 element의 부모
  deleteLi.remove(); //삭제 됨
}
function painToDo(newToDo) {
  const liCreate = document.createElement("li");
  const spanCreate = document.createElement("span");
  const buttonCreate = document.createElement("button"); //할일을 삭제할 수 있는 버튼을 만듬
  buttonCreate.innerText = "🖕";
  buttonCreate.addEventListener("click", deleteToDo); // 버튼이 클릭되면 할일이 삭제될 수 있도록 함수를 만들거임, 함수 이름은 deleteToDo
  liCreate.appendChild(spanCreate); //span을 li안에 넣어줌 <li> <span> </span> </li> 이런 식으로. 왜냐하면 나중에 할일을 삭제하는 버튼도 만들 것이기 때문
  liCreate.appendChild(buttonCreate); //버튼도 li안에 넣어줌
  spanCreate.innerText = newToDo; //할일로 들어갈 텍스트는 newToDo임. handleToDoSubmit에서 newToDo에 사용자가 추가한 할일을 저장했음
  toDoList.appendChild(liCreate); //toDoList 아래에 추가해줌
}
function handleToDoSubmit(event) {
  event.preventDefault(); //자동 새로고침 되는 것을 막아줌
  const newToDo = toDoInput.value; //추가한 할일을 newToDo에 저장함
  toDoInput.value = ""; //할일을 하나 추가하면 추가하는 칸의 값을 비워줌, 새로운 값을 넣을 수 있도록
  painToDo(newToDo);
}

toDoForm.addEventListener("submit", handleToDoSubmit);
