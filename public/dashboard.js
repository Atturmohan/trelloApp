import { boardConfig } from './data.js' ;

class Tasks{
       constructor(config){
           this.name=config.name;
           this.due=config.due;
       }

       setContainer( container ) {
        this.container = container;
        this.render();
    }

    render(){
         const template =`
            <textarea>${this.name}</textarea>
         `;

         this.container.innerHTML = template;

    }

}


class TaskLists{
    constructor(config){
        this.name=config.name;
        this.taskg= config.tasks.map(task => new Tasks(task)); 
    }

    setContainer(container){
        this.container=container;
        this.render();
    }

    renderTask(task,idx){
        const wrapper = document.createElement('div');
        wrapper.setAttribute('id',`task-${this.name}-${idx}`);
        this.taskWrapper.appendChild(wrapper);
        task.setContainer(wrapper);

    }
    
    render(){
          const template = 
                `<div class ="tasklist_container">
                <div class ="tasklist-header">
                <h3 class="task_heading">${this.name}</h3>
                <span class="task_bar">...</span>
                </div>
                </div>
                `; 
                this.container.innerHTML=template;
                this.taskWrapper = this.container.querySelector('.tasklist_container');
                this.taskg.forEach(this.renderTask.bind(this));
    }

}

class BoardConiguration{
constructor(config){
   // this.taskliste = config.taskLists;
      this.tasklists= config.map(tasklist => new TaskLists(tasklist));
}

setContainer(container){
    this.container=container;
    this.render();
     
}
render(){
     
    this.tasklists.forEach(tasklist => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('tasklist');
        wrapper.setAttribute('id',`task-${tasklist.name}`);
        this.container.appendChild(wrapper);
        tasklist.setContainer(wrapper);
    });
    
}

}


const boardConiguration = new BoardConiguration(boardConfig.taskLists);
boardConiguration.setContainer(document.querySelector('.board'))