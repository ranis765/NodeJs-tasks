const fs = require('fs');
const Task = require('./task');

class TaskManager {
    constructor() {
        this.tasks = [];
    }

    loadTasks(filename) {
        try {
            const data = fs.readFileSync(filename, 'utf8');
            const tasksArray = JSON.parse(data);
            this.tasks = tasksArray.map(task => new Task(task.id, task.description, task.status));
        } catch (err) {
            console.error('Ошибка', err);
        }
    }

    saveTasks(filename) {
        try {
            const tasksArray = this.tasks.map(task => ({ id: task.id, description: task.description, status: task.status }));
            fs.writeFileSync(filename, JSON.stringify(tasksArray, null, 2));
            console.log('Задача успешно сохранена');
        } catch (err) {
            console.error('Ошибка', err);
        }
    }

    printTasks() {
        this.tasks.forEach(task => console.log(task.toString()));
    }

    addTask(id, description, status) {
        const newTask = new Task(id, description, status);
        this.tasks.push(newTask);
        this.saveTasks('tasks.json');
    }

    removeTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks('tasks.json');
    }
}

module.exports = TaskManager;