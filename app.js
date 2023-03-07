const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const dbURL = 'mongodb://localhost:27017/taskmanager';
const db = mongoose.connection;
const flash = require('connect-flash');
const session = require('express-session');
const Task = require('./models/tasks');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.json());
mongoose.set('strictQuery', true);

mongoose.connect(dbURL, {
    useNewUrlParser: true
});
db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', () => {
    console.log('DATABASE CONNECTED!');
})

const sessionConfig = {
    name: 'session',
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        //secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

const getMonthString = (num) => {
    const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    return monthArray[num];
}

app.get('/taskmanager', async (req, res) => {
    const tasks = await Task.find({});
    res.render('home', { tasks });
});

app.post('/taskmanager', async (req, res) => {
    const due = new Date(req.body.duedate);
    const newDue = `${due.getDate()} ${getMonthString(due.getMonth())} ${due.getFullYear()}`;
    req.body.duedate = newDue;
    const task = new Task(req.body);
    await task.save();
    req.flash('success', 'New task added successfully!!');
    res.redirect('/taskmanager');
});

app.get('/taskmanager/:id/edit', async (req, res) => {
    const { id } = req.params;
    const tasks = await Task.find({});
    const edittedTask = await Task.findById(id);
    res.render('edit', { tasks, edittedTask });
});

app.put('/taskmanager/:id', async (req, res) => {
    const { id } = req.params;
    const due = new Date(req.body.duedate);
    const newDue = `${due.getDate()} ${getMonthString(due.getMonth())} ${due.getFullYear()}`;
    req.body.duedate = newDue;
    await Task.findByIdAndUpdate(id, { ...req.body });
    req.flash('success', 'Updated your task successfully!');
    res.redirect('/taskmanager');
});

app.delete('/taskmanager/:id', async (req, res) => {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    req.flash('success', 'Deleted your task successfully!');
    res.redirect('/taskmanager');
})

app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000!');
})