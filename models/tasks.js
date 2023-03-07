const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tasksSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    duedate: {
        type: String,
        required: true
    }
});

const Task = mongoose.model('Task', tasksSchema);
module.exports = Task;