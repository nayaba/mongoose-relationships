require('dotenv').config()

const mongoose = require('mongoose')
const Todo = require('./models/todo')
const User = require('./models/user')

const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    await runQueries()

    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
    process.exit()
}

connect()

// QUERY FUNCTIONS
const createTodo = async () => {
    const todoData = {
        text: 'learn React',
        isComplete: false
    }

    const todo = await Todo.create(todoData)
    console.log('New todo: ', todo)
}



const findTodos = async () => {
    const todos = await Todo.find({})
    console.log("All todos: ", todos)
}

// 66a09d7791eccfead2f23f9c - new todo
// 66a0a559d0e0481ff4ea398c - subtask

const createSubtask = async () => {
    const todoId = '66a09d7791eccfead2f23f9c'
    const todo = await Todo.findById(todoId)

    const subtaskData = {
        text: 'Learn how props work',
        isComplete: false
    }

    const subtask = todo.subtasks.push(subtaskData)
    await todo.save()
    console.log("Modified todo: ", todo)
}

const findSubtask = async () => {
    const todoId = '66a09d7791eccfead2f23f9c'
    const subtaskId = '66a0a559d0e0481ff4ea398c'

    const todo = await Todo.findById(todoId)
    const subtask = todo.subtasks.id(subtaskId)

    console.log('Subdocument: ', subtask)
}

const removeSubtask = async () => {
    const todoId = '66a09d7791eccfead2f23f9c'
    const subtaskId = '66a0a559d0e0481ff4ea398c'

    const todo = await Todo.findById(todoId)
    todo.subtasks.pull(subtaskId)
    await todo.save()

    console.log('Updated document: ', todo)
}

const updateSubtask = async () => {
    const todoId = '66a09d7791eccfead2f23f9c'
    const subtaskId = '66a0adc07ed366bfaee360fa'

    const todo = await Todo.findById(todoId)
    const subtask = todo.subtasks.id(subtaskId)

    subtask.isComplete = true
    await todo.save()

    console.log('Updated document: ', todo)
}

const findParentAndRemoveSubtask = async () => {
    const todo = await Todo.findOne({
        'subtasks.text': 'Learn how props work'
    })

    const subtask = todo.subtasks.find(subtask => {
        return subtask.text === 'Learn how props work'
    })

    subtask.deleteOne()

    await todo.save()
    console.log('Updated todo: ', todo)
}

const createUser = async () => {
    const userData = {
        name: 'Alex',
        email: 'alex@mail.com'
    }

    const user = await User.create(userData)
    console.log('New user: ', user)
}

const assignTodo = async () => {
    const todoId = '66a09d7791eccfead2f23f9c'
    const userId = '66a0b696ea4ea91ed57b57e4'

    const updatedTodo = await Todo.findByIdAndUpdate(
        todoId,
        {assignee: userId},
        {new: true}
    )

    console.log('Updated document: ', updatedTodo)
}

const findAllTodos = async () => {
    const todos = await Todo.find({}).populate('assignee')
    console.log('All todos: ', todos)
}

// RUN QUERIES

const runQueries = async () => {
    console.log('Queries running')
    // await createTodo()
    // await findTodos()
    // await createSubtask()
    // await findSubtask()
    // await removeSubtask()
    // await updateSubtask()
    // await findParentAndRemoveSubtask()
    // await createUser()
    // await assignTodo()
    await findAllTodos()
}