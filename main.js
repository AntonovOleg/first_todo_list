let todo = { //экземпляр задания
    dateOfCreate: '',
    dateOfOut: '',
    caption: '',
    status_flag: '', //1 - доступна, 2 -  в процессе, 3 - выполнено
}

//конструктор заданий
function task(dateOfCreate, dateOfOut, caption, status_flag){
    this.dateOfCreate = dateOfCreate;
    this.dateOfOut = dateOfOut;
    this.caption = caption;
    this.status_flag = status_flag;
}

let todos = [] //массив заданий

function refresh_list(){
    //обновление дом в соответствии с данными в массиве 

    let todos_dom = document.getElementsByClassName('list_todos')[0];
    
    //не работает тк удаляется структура дом
    // for (i in document.getElementsByClassName('task')){
    //     console.debug('iter for');
    //     todos_dom.removeChild(i);
    // }

    //получаем количество заданий
    let count_tasks = todos_dom.getElementsByClassName('task').length;
    
    //начиная с последнего удаляем их из дом
    for(let i=count_tasks-1;i>=0;i--){
        todos_dom.removeChild(todos_dom.getElementsByClassName('task')[i]);
    }

    //рисуем все задания
    for (i in todos){
        let obj = document.createElement('li');
        obj.classList.add('task');
        let text = document.createTextNode(todos[i].dateOfCreate + todos[i].dateOfOut + todos[i].caption + todos[i].status_flag);
        obj.appendChild(text);

        //obj.innerHTML+='<button class="inProgress">Приступить</button><button class="complete">Выполнено</button><button class="delete">Удалить</button>'

        let btn1 = document.createElement('button');
        btn1.classList.add('inProgress');
        btn1.innerText='Приступить';
        btn1.onclick=setInProgress;

        let btn2 = document.createElement('button');
        btn2.classList.add('complete');
        btn2.innerText='Выполнено';
        btn2.onclick=setComplete;

        let btn3 = document.createElement('button');
        btn3.classList.add('delete');
        btn3.innerText='Удалить';
        btn3.onclick=delete_item;

        obj.appendChild(btn1);
        obj.appendChild(btn2);
        obj.appendChild(btn3);

        todos_dom.appendChild(obj);
    }

}

function add_task(){
    console.log('add task');
    let dateOfCreate = document.getElementsByClassName('dateOfCreate')[0].value;
    let dateOfOut = document.getElementsByClassName('dateOfOut')[0].value;
    let caption = document.getElementsByClassName('caption')[0].value;
    let status_flag = document.getElementsByClassName('status_flag')[0].value;
    
    let newTask = new task(dateOfCreate,dateOfOut,caption,status_flag);
    todos.push(newTask);

    refresh();
}

function refresh(){
    refresh_list();
}

function setInProgress(){
    console.log(this);
}

function setComplete(){
    console.log(this);
}

function delete_item(){
    console.log(this);
}