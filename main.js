//глобальные константы для фильтров
const FILTER_MODE_ALL_TASKS = 0;
const FILTER_MODE_INPROGRESS_TASKS = 1;
const FILTER_MODE_COMPLETE_TASkS = 2;

//экземпляр задания
let todo = { 
    dateOfCreate: '',
    dateOfOut: '',
    caption: '',
    statusFlag: '',
}

//массив заданий
let todos = [];

//привязка кнопок
let btnAdd = document.getElementsByClassName('buttonSave')[0];
let btnRefresh = document.getElementsByClassName('buttonRefresh')[0];
let btnFilterAll = document.getElementsByClassName('filterAll')[0];
let btnFilterInProgress = document.getElementsByClassName('filterInProgress')[0];
let btnFilterComplete = document.getElementsByClassName('filterComplete')[0];
let btnDeleteAll = document.getElementsByClassName('deleteAll')[0];

//назначение обработчиков кнопкам
btnAdd.onclick = addTask;
btnRefresh.onclick = () => refreshList(FILTER_MODE_ALL_TASKS);
btnFilterAll.onclick = () => refreshList(FILTER_MODE_ALL_TASKS);
btnFilterInProgress.onclick = () => refreshList(FILTER_MODE_INPROGRESS_TASKS);
btnFilterComplete.onclick = () => refreshList(FILTER_MODE_COMPLETE_TASkS);
btnDeleteAll.onclick = deleteAll;

//конструктор заданий
function task(dateOfCreate, dateOfOut, caption, statusFlag){
    this.dateOfCreate = dateOfCreate;
    this.dateOfOut = dateOfOut;
    this.caption = caption;
    this.statusFlag = statusFlag;
}

function makeTaskWithButtons(){
    let todosDom = document.getElementsByClassName('listTodos')[0];
    let currentLiElement = document.createElement('li');
    currentLiElement.classList.add('task');
    let text = document.createTextNode(todos[currentTask].dateOfCreate +'| ' + todos[currentTask].dateOfOut +'| '+ todos[currentTask].caption + '| '+todos[currentTask].statusFlag);
    currentLiElement.appendChild(text);

    let btnInProgress = document.createElement('button');
    btnInProgress.classList.add('inProgress');
    btnInProgress.innerText = 'Приступить';
    btnInProgress.onclick=setInProgress;
    currentLiElement.appendChild(btnInProgress);

    let btnComplete = document.createElement('button');
    btnComplete.classList.add('complete');
    btnComplete.innerText = 'Выполнено';
    btnComplete.onclick = setComplete;
    currentLiElement.appendChild(btnComplete);

    let btnDelete = document.createElement('button');
    btnDelete.classList.add('delete');
    btnDelete.innerText = 'Удалить';
    btnDelete.onclick = deleteItem;
    currentLiElement.appendChild(btnDelete);

    todosDom.appendChild(currentLiElement);
}

function refreshList(filterMode){
    //обновление дом в соответствии с данными в массиве 
    let todosDom = document.getElementsByClassName('listTodos')[0];
    
    //получаем количество заданий
    const countTasks = todosDom.getElementsByClassName('task').length;
    
    //начиная с последнего удаляем их из дом
    for(let i = countTasks-1; i >= 0; i--){
        todosDom.removeChild(todosDom.getElementsByClassName('task')[i]);
    }

    //рисуем все задания
    for (currentTask in todos){
        switch(filterMode){
            case FILTER_MODE_ALL_TASKS:
                makeTaskWithButtons();
                break;
            case FILTER_MODE_INPROGRESS_TASKS:
                if(todos[currentTask].statusFlag === 'В процессе'){
                    makeTaskWithButtons();
                }
                break;
            case FILTER_MODE_COMPLETE_TASkS:
                if(todos[currentTask].statusFlag === 'Выполнено'){
                    makeTaskWithButtons();
                }
                break;
            default:
                sendMessage('Непредвиденная ошибка');
        }
    } 
}

function addTask(){
    const dateOfCreate = document.getElementsByClassName('dateOfCreate')[0].value;
    const dateOfOut = document.getElementsByClassName('dateOfOut')[0].value;
    const caption = document.getElementsByClassName('caption')[0].value;
    const statusFlag = document.getElementsByClassName('statusFlag')[0].value;   

    if((dateOfCreate == '') || (dateOfOut == '') || (caption == '') || (statusFlag == '')){
        sendMessage("Поля ввода не должны быть пустыми");
        return;
    }
    
    const newTask = new task(dateOfCreate,dateOfOut,caption,statusFlag);
    todos.push(newTask);
    refreshList(FILTER_MODE_ALL_TASKS);
}

function setInProgress(){
    //проверяем какой это таск по контексту
    let context = this;
    let num = getNumberTask(context,0);
    //вносим изменения и обновляем
    todos[num].statusFlag = 'В процессе';
    refreshList(FILTER_MODE_ALL_TASKS);
}

function setComplete(){
    //проверяем какой это таск по контексту
    let context = this;
    let num = getNumberTask(context,1);
    //вносим изменения и обновляем
    todos[num].statusFlag = 'Выполнено';
    refreshList(FILTER_MODE_ALL_TASKS);
}

function deleteItem(){
    let todosDom = document.getElementsByClassName('listTodos')[0];
    //проверяем какой это таск по контексту
    let context = this;
    let num = getNumberTask(context,2);
    //вносим изменения и обновляем    
    todos.splice(num,1);
    todosDom.removeChild(todosDom.getElementsByTagName('li')[num]);
    refreshList(FILTER_MODE_ALL_TASKS);
}

function getNumberTask(context, typeBtn){
    let todosDom = document.getElementsByClassName('listTodos')[0];
    for(let j = todosDom.getElementsByTagName('li').length-1; j >= 0; j--){
        if(todosDom.getElementsByTagName('li')[j].getElementsByTagName('button')[parseInt(typeBtn)] === context){
            return j;
        }    
    }
}

function deleteAll(){
    let todosDom = document.getElementsByClassName('listTodos')[0];
    if(prompt('Вы действительно хотите удалить всё? y/n') === 'y'){
        //удаление всех заданий и обновление рендера
        for(let i = todosDom.getElementsByTagName('li').length-1; i >= 0; i--){
            todosDom.removeChild(todosDom.getElementsByTagName('li')[i]);
        }
        todos.splice(0,todos.length);
    }
}

function sendMessage(message){
    let dialogMessageDom = document.getElementsByClassName('dialogMessage')[0];
    dialogMessageDom.innerText = message;
    dialogMessageDom.classList = "dialogMessage";
    setTimeout(function(){
        dialogMessageDom.classList.add('hidden');
    },1000)
}
