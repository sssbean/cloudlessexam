'use strict'

var getRawBody = require('raw-body');
const todo = require('./todo.js')

exports.handler = (req, resp, context) => {
  resp.setHeader('content-type', 'application/json')
  var uri = (req.url).split('/')
  if (uri.length == 0) {
    resp.send(JSON.stringify({ 'code': 400, 'body': 'Bad request' }))
  } else {
    var route = uri[uri.length - 1]
    switch (req.method) {
      //A GET method with the endpoint named "list" is implemented that returns a JSON response with code 200 and a list of todo items, where the response body is the return value of the list function in todojs.
      case 'GET':
        switch (route) {
          case "list":
            resp.send(JSON.stringify(todo.list()))
            break
          default:
            resp.send(JSON.stringify({ 'code': 400, 'body': 'Bad request' }))
            break
        }
        break
      //A suitable POST method with the endpoint named "add" is implemented that adds a new task to the todo list based on the request body in JSON format, and returns a response with a suitable HTTP code for adding successfully or not successfully.
      case 'POST':
        switch (route) {
          case "add":
            getRawBody(req, (err, body) => {
              resp.send(JSON.stringify(todo.add(body)))
            })
            break
          default:
            resp.send(JSON.stringify({ 'code': 400, 'body': 'Bad request' }))
            break
        }
        break
      //PUT - endpoint = url/remove
      case 'PUT':
        switch (route) {
          case "remove":
            getRawBody(req, (err, body) => {
              resp.send(JSON.stringify(todo.remove(body)))
            })
            break
          default:

            resp.send(JSON.stringify({ 'code': 400, 'body': 'Bad request' }))
            break
        }
      default:
       
        resp.send(JSON.stringify({ 'code': 400, 'body': 'Bad requset' }))
    }
  }
}