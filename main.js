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
