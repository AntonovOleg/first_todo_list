let todo = { //экземпляр задания
    dateOfCreate: '',
    dateOfOut: '',
    caption: '',
    status_flag: '',
}

//конструктор заданий
function task(dateOfCreate, dateOfOut, caption, status_flag){
    this.dateOfCreate = dateOfCreate;
    this.dateOfOut = dateOfOut;
    this.caption = caption;
    this.status_flag = status_flag;
}

let todos = [] //массив заданий

function refresh_list(filter_mode){
    //обновление дом в соответствии с данными в массиве 

    let todos_dom = document.getElementsByClassName('list_todos')[0];

    //получаем количество заданий
    let count_tasks = todos_dom.getElementsByClassName('task').length;
    
    //начиная с последнего удаляем их из дом
    for(let i=count_tasks-1;i>=0;i--){
        todos_dom.removeChild(todos_dom.getElementsByClassName('task')[i]);
    }

    //рисуем все задания
    for (i in todos){
        if(filter_mode==0){
            let obj = document.createElement('li');
            obj.classList.add('task');
            let text = document.createTextNode(todos[i].dateOfCreate +'| ' + todos[i].dateOfOut +'| '+ todos[i].caption + '| '+todos[i].status_flag);
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
        } else if(filter_mode==1){
            if(todos[i].status_flag=='В процессе'){
                let obj = document.createElement('li');
                obj.classList.add('task');
                let text = document.createTextNode(todos[i].dateOfCreate +'| ' + todos[i].dateOfOut +'| '+ todos[i].caption + '| '+todos[i].status_flag);
                obj.appendChild(text);

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
        } else if(filter_mode==2){
            if(todos[i].status_flag=='Выполнено'){
                let obj = document.createElement('li');
                obj.classList.add('task');
                let text = document.createTextNode(todos[i].dateOfCreate +'| ' + todos[i].dateOfOut +'| '+ todos[i].caption + '| '+todos[i].status_flag);
                obj.appendChild(text);

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

    refresh(0);
}

function refresh(filter_mode){
    refresh_list(filter_mode);
}

function setInProgress(){
    //проверяем какой это таск по контексту
    let context = this;
    let num = getNumberTask(context,0);

    //вносим изменения и обновляем
    todos[num].status_flag = 'В процессе';
    refresh(0);
}

function setComplete(){
    //проверяем какой это таск по контексту
    let context = this;
    let num = getNumberTask(context,1);

    //вносим изменения и обновляем
    todos[num].status_flag = 'Выполнено';
    refresh(0);
}

function delete_item(){
    let todos_dom = document.getElementsByClassName('list_todos')[0];

    //проверяем какой это таск по контексту
    let context = this;

    console.log('This = ');
    console.log(this);

    let num = getNumberTask(context,2);

    console.log('number of context = ');
    console.log(num);

    //вносим изменения и обновляем

    console.log('num is ' + num);
    console.log('testing');
    console.log(todos_dom);
    console.log(todos_dom.getElementsByTagName('li')[num]);
    
    todos.splice(num,1);
    todos_dom.removeChild(todos_dom.getElementsByTagName('li')[num]);

    refresh(0);
}

function getNumberTask(context, typeBtn){
    let todos_dom = document.getElementsByClassName('list_todos')[0];
    for(let j=todos_dom.getElementsByTagName('li').length-1;j>=0;j--){
        if(todos_dom.getElementsByTagName('li')[j].getElementsByTagName('button')[parseInt(typeBtn)] == context){
            return j;
        }    
    }
}

function button_see_all(){
    refresh(0);
}

function button_see_inprogress(){
    refresh(1);
}

function button_see_complete(){
    refresh(2);
}

function delete_all(){
    let todos_dom = document.getElementsByClassName('list_todos')[0];
    if(prompt('del all y/n')=='y'){
        //удаление всех заданий и обновление рендера
        console.log('del all');

        for(let i=todos_dom.getElementsByTagName('li').length-1;i>=0;i--){
            console.log(i);
            todos_dom.removeChild(todos_dom.getElementsByTagName('li')[i]);
        }

        todos.splice(0,todos.length);
    }
}
