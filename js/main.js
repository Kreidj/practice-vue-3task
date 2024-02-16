new Vue({
    el: '#app',
    data(){
        return {
            newTask: {
                title: '',
                description: '',
                deadline: '',
                createdAt: new Date().toLocaleString(),
                lastChange: null,
                rreturn: null,
                isOverdue: false
            },
            plannedTasks: [],
            progressTasks: [],
            testingTasks: [],
            completedTasks: [],
            editedTask: null,
            editedTaskIndex: null,
            editedColumn: null,
        }
    },
    methods:{
        addTask() {
            if (!this.newTask.title) {
                alert('Необходимо указать заголовок задачи');
                return;
            }
            if (!this.newTask.description) {
                alert('Необходимо указать описание задачи');
                return;
            }
            if (!this.newTask.deadline) {
                alert('Необходимо указать дэдлайн (срок сдачи задачи)');
                return;
            }
            if (new Date(this.newTask.deadline) <= new Date(new Date().setDate(new Date().getDate()))) {
                alert('Недействительная дата дэдлайна (минимум должен быть - завтра)');
                return;
            }
            this.plannedTasks.push({...this.newTask});
            this.newTask = {
                title: '',
                description: '',
                deadline: '',
                createdAt: new Date().toLocaleString(),
                lastChange: null
            }
        },
        deleteTask(taskIndex) {
            this.plannedTasks.splice(taskIndex, 1);
        },
        startEditing(taskIndex, column) {
            this.editedTask = {...this[column][taskIndex]};
            this.editedTaskIndex = taskIndex;
            this.editedColumn = column;
        },
        finishEditing(taskIndex) {
            this[this.editedColumn][taskIndex] = {...this.editedTask, lastChange: new Date().toLocaleString()};
            this.editedTask = null;
            this.editedTaskIndex = null;
            this.editedColumn = null;
        },
        moveToInProgress(taskIndex) {
            const taskToMove = this.plannedTasks.splice(taskIndex, 1)[0];
            this.progressTasks.push(taskToMove);
        },

    }
})