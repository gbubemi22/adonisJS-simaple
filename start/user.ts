import Route from '@ioc:Adonis/Core/Route'

Route.get('/users', 'UserController.index')
Route.get('/users/:id', 'UserController.show')
