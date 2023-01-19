const toDoForm = document.querySelector("#todo-form");
const toDoList = document.querySelector("#todo-list");
const toDoInput = toDoForm.querySelector("input"); //toDoForm 안에 있는 input을 찾음
let toDos = []; // 할일이 추가될때마다 toDos라는 배열에 추가함, 새로고침할때마다 할일이 초기화되는 것을 방지하기 위한 작업
const TODOS_KEY = "todos";
function saveToDos() {
  // JSON.stringify("여기에다가 값을 넣으세요") : JavaScript object, array 등 모든 JavaScript 코드를 string으로 바꿔줌
  // JSON.parse("여기에다가 값을 넣으세요") : 단순 string을 배열로 만들어줌
  // 모든 작업은 [1, 2, 3] 을 ["1", "2", "3"]으로 만들기 위한 작업임
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)); // localStorage에 할일을 저장함, 이렇게 해야 새로고침해도 초기화가 안됨
}
function deleteToDo(event) {
  const deleteLi = event.target.parentElement; //할일이 5개라고 가정했을 때, 어떤 할일을 클릭했는지 알 수 있도록 해줌, parentElement : 클릭된 element의 부모
  deleteLi.remove(); //삭제 됨
  // filter : 배열을 검사하여 새로운 배열을 만드는 것임. 기존의 배열은 변하지 않음.
  // true를 리턴 시 해당 배열이 새로운 배열에도 똑같이 들어가고, false를 리턴 시 새로운 배열에 해당 배열이 들어가지 않음.
  // const newArray = arr.filter(item => item > 2) : item이 2보다 크면 새로운 배열(newArray)에 들어가고, 그게 아니라면 새로운 배열에 안들어감
  toDos = toDos.filter((item) => item.id !== parseInt(deleteLi.id)); //현재 들어온 deleteLi의 id와 같다면 false일 것이므로 새로운 배열에서 버려짐
  saveToDos();
}
function paintToDo(newToDo) {
  const liCreate = document.createElement("li");
  liCreate.id = newToDo.id; //li에 id 요소를 넣어줌
  const spanCreate = document.createElement("span");
  const buttonCreate = document.createElement("button"); //할일을 삭제할 수 있는 버튼을 만듬
  buttonCreate.innerText = "🖕";
  buttonCreate.addEventListener("click", deleteToDo); // 버튼이 클릭되면 할일이 삭제될 수 있도록 함수를 만들거임, 함수 이름은 deleteToDo
  liCreate.appendChild(spanCreate); //span을 li안에 넣어줌 <li> <span> </span> </li> 이런 식으로. 왜냐하면 나중에 할일을 삭제하는 버튼도 만들 것이기 때문
  liCreate.appendChild(buttonCreate); //버튼도 li안에 넣어줌
  spanCreate.innerText = newToDo.text; //할일로 들어갈 텍스트는 newToDo.text임. handleToDoSubmit에서 newToDo Object에 text라는 이름으로 사용자가 추가한 할일을 저장했음
  toDoList.appendChild(liCreate); //toDoList 아래에 추가해줌
}
function handleToDoSubmit(event) {
  event.preventDefault(); //자동 새로고침 되는 것을 막아줌
  const newToDo = toDoInput.value; //추가한 할일을 newToDo에 저장함
  toDoInput.value = ""; //할일을 하나 추가하면 추가하는 칸의 값을 비워줌, 새로운 값을 넣을 수 있도록
  const newTodoObj = {
    //newToDo는 사용자가 추가한 할일이고, id는 랜덤한 값이 들어감 말 그대로 id
    text: newToDo,
    id: Date.now(),
  };
  toDos.push(newTodoObj); // toDos라는 배열에 할일을 추가함
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);
const savedToDos = localStorage.getItem(TODOS_KEY);
if (savedToDos) {
  //savedToDos가 뭐라도 있으면, Local Storage에 뭐라도 있으면, 할일이 있으면
  const parsedToDos = JSON.parse(savedToDos); // string으로 되어있던 Local Storage에 있던 값을 배열로 바꿔서 parsedToDos에 할당
  toDos = parsedToDos; // 하지만 let toDos = []문장때문에 새로고침할때마다 빈 배열로 시작되고, 새로 추가한 할일만 저장이 됨, 그걸 방지하기 위해 Local Storage에 값이 있으면 toDos에 원래 있던 할일을 넣어줌
  parsedToDos.forEach(paintToDo); //배열을 하나하나 접근하는 forEach 사용
  //forEach를 통해 Local Storage 에 할일 목록에 밥 먹기, 잠 자기 가 있으면 밥 먹기 접근하고, 잠 자기를 접근함. 그러므로 paintToDo 호출하면 끝
  //밥 먹기, 잠자기를 접근하다가 id로 추가하는 것으로 프로그래밍을 수정했을 때부터는 할 일, id까지 접근함
}
