import Route from '@ioc:Adonis/Core/Route'

Route.post('/register', 'AuthController.createUser')
Route.post('/login', 'AuthController.login')
