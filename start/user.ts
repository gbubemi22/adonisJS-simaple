import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  // Route.get('/users', 'UserController.index')
  Route.get('/users/:id', 'UsersController.getUser')
  Route.get('/users', 'UsersController.getAllUsers')
}).prefix('api/v1')
