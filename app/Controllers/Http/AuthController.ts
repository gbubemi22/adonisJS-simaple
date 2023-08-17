import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'

export default class AuthController {
  public async createUser({ request, response }: HttpContextContract) {
    try {
      const userData = request.only(['name', 'email', 'password', 'number'])

      // Check if a user with the given email or number already exists
      const existingUser = await User.query()
        .where('email', userData.email)
        .orWhere('number', userData.number)
        .first()

      if (existingUser) {
        return response
          .status(400)
          .json({ error: 'User with this email or number already exists.' })
      }

      // Hash the password before saving
      const hashedPassword = await Hash.make(userData.password)

      const user = new User()
      user.name = userData.name
      user.email = userData.email
      user.password = hashedPassword
      user.number = userData.number
      await user.save()

      return response.status(201).json(user)
    } catch (error) {
      return response.status(500).json({ error: 'An error occurred while creating the user.' })
    }
  }
  public async login({ request, response }: HttpContextContract) {
    try {
      const { email, password } = request.only(['email', 'password'])

      // Find the user by email
      const user = await User.query().where('email', email).first()

      if (!user) {
        return response.status(401).json({ error: 'Invalid credentials.' })
      }

      // Verify password
      const isPasswordValid = await Hash.verify(user.password, password)

      if (!isPasswordValid) {
        return response.status(401).json({ error: 'Invalid credentials.' })
      }

      // Return a successful login response
      return response.status(200).json({ message: 'Login successful.', user })
    } catch (error) {
      return response.status(500).json({ error: 'An error occurred while logging in.' })
    }
  }
}
