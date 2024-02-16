new Vue({
    el: '#app',
    data() {
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
    created() {
        this.loadDataFromLocalStorage();
    },
    updated() {
        this.saveDataToLocalStorage();
    },
    methods: {
        addTask() {
            if (!this.newTask.title) {
                alert('Please specify the task title');
                return;
            }
            if (!this.newTask.description) {
                alert('Please provide the task description');
                return;
            }
            if (!this.newTask.deadline) {
                alert('Please specify the deadline for the task');
                return;
            }
            if (new Date(this.newTask.deadline) <= new Date(new Date().setDate(new Date().getDate()))) {
                alert('Invalid deadline date (minimum should be tomorrow)');
                return;
            }
            this.plannedTasks.push({ ...this.newTask });
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
            this.editedTask = { ...this[column][taskIndex] };
            this.editedTaskIndex = taskIndex;
            this.editedColumn = column;
        },
        finishEditing(taskIndex) {
            this[this.editedColumn][taskIndex] = { ...this.editedTask, lastChange: new Date().toLocaleString() };
            this.editedTask = null;
            this.editedTaskIndex = null;
            this.editedColumn = null;
        },
        moveToInProgress(taskIndex) {
            const taskToMove = this.plannedTasks.splice(taskIndex, 1)[0];
            this.progressTasks.push(taskToMove);
        },
        moveToTesting(taskIndex) {
            const taskToMove = this.progressTasks.splice(taskIndex, 1)[0];
            this.testingTasks.push(taskToMove);
        },
        returnToInProgress(taskIndex) {
            if (!this.testingTasks[taskIndex].rreturn) {
                alert('Please specify the reason for return');
                return;
            }
            const taskToMove = this.testingTasks.splice(taskIndex, 1)[0];
            this.progressTasks.push(taskToMove);
        },
        moveToCompleted(taskIndex) {
            const taskToMove = this.testingTasks.splice(taskIndex, 1)[0];
            taskToMove.isOverdue = new Date(taskToMove.deadline) < new Date();
            this.completedTasks.push(taskToMove);
        },
        loadDataFromLocalStorage() {
            const storedData = JSON.parse(localStorage.getItem('taskData'));
            if (storedData) {
                this.plannedTasks = storedData.plannedTasks;
                this.progressTasks = storedData.progressTasks;
                this.testingTasks = storedData.testingTasks;
                this.completedTasks = storedData.completedTasks;
            }
        },
        saveDataToLocalStorage() {
            const dataToStore = {
                plannedTasks: this.plannedTasks,
                progressTasks: this.progressTasks,
                testingTasks: this.testingTasks,
                completedTasks: this.completedTasks
            };
            localStorage.setItem('taskData', JSON.stringify(dataToStore));
        },
    }
})
