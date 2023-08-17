import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/register', 'AuthController.createUser')
  Route.post('/login', 'AuthController.login')
}).prefix('api/v1/auth')
