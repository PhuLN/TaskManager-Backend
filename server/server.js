const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const port = process.env.PORT || 3000

var app = express();

app.use(bodyParser.json());

// Add new todo and return it
app.post('/todos', (req, res) => {
    var todo = new Todo({
        task: req.body.task
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (error) => {
        res.status(400).send(error);
    });
});

// Returns all todos
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(e);
    });
});


// Return todo by ID 
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if(!todo) {
            return res.status(404).send()
        }
        res.send({todo})
    }, (e) => {
        res.status(400).send(e)
    });
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.status(200).send({todo});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${ port }`);
});

module.exports = {
    app
}

// var newTodo = new Todo({
//     task: 'Feed the cat',
// });

// var newUser = new User({
//     username: 'Lasagna Larry',
//     email: 'lasagna@larry.com'
// });

// newTodo.save().then((result) => {
//     console.log('Saved', result)
// }, (error) => {
//     console.log('Error', error)
// });

// newUser.save().then((result) => {
//     console.log('Saved', result);
// }, (error) => {
//     console.log('Error', error);
// });