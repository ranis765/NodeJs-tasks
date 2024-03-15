const TaskManager = require('./task-manager');
const taskManager = new TaskManager();
taskManager.loadTasks('tasks.json');
taskManager.printTasks();
