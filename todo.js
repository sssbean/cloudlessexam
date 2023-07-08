'use strict'
//An array called ‘_data’ is used to store the todo items.
var _data = []

//The add function takes a string parameter and adds it to the array 
exports.add = (body) => {
    try {
        const result = JSON.parse(body)
        _data.push(result)
        return { 'code': 201, 'body': 'Successfully' }
    } catch (err) {
        return { 'code': 410, 'body': 'JSON Object required.' }
    }
}

//The list function function returns a response with code 200 and a list of all items in the array
exports.list = () => {
    return {
        'code': 200, 'body': _data.map((item, index) => ({ id: index, ...item }))
    }
}

//The remove function takes a string parameter and removes the corresponding task from the array if it exists
exports.remove = (body) => {
    try {
        const result = JSON.parse(body);
        const taskToRemove = result.hasOwnProperty('task') ? result.task : null;

        if (taskToRemove === null) {
            return { 'code': 400, 'body': 'Task value is required.' };
        }
        const index = _data.findIndex(item => item.task === taskToRemove);
        if (index !== -1) {
            _data.splice(index, 1);
            return { 'code': 201, 'body': 'Successfully' };
        } else {
            return { 'code': 400, 'body': 'Not successfully, Task not found.' };
        }
    } catch (err) {
        return { 'code': 410, 'body': 'JSON Object required.' };
    }
}