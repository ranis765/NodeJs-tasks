import express from 'express';
import mongoose from 'mongoose';
import { validateTaskData } from './middlewares/validateTaskData.js'
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
	res.send('Hello');
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});



mongoose.connect('mongodb://127.0.0.1:27017/todo_list')
	.then(() => console.log('db ok'))
	.catch((err) => console.log('db error', err));



const taskSchema = new mongoose.Schema({
	id: String,
	title: String,
	status: String
});

export const TaskModel = mongoose.model('Task', taskSchema);


app.get('/tasks', async (req, res) => {
	try {
		const tasks = await TaskModel.find();
		res.json(tasks);

	} catch (err) {
		res.status(500).send(err.mesage);
	}
});

app.post('/tasks', validateTaskData, async (req, res) => {
	try {
		const newTask = new TaskModel(req.body);
		const savedTask = await newTask.save();
		res.status(201).json(savedTask);
	} catch (err) {
		res.status(400).send(err.message);
	}

});

app.delete('/tasks/del', async (req, res) => {
	const ids = req.body.id;
	try {
		const result = await TaskModel.deleteMany({ _id: { $in: ids } });
		if (result.deletedCount === 0) {
			return res.status(404).send('Задачи не найдены');
		}

		res.status(204).send();
	} catch (err) {
		res.status(400).send(err.message);
	}
});
