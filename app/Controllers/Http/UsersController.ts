import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import NotFoundException from 'App/Exceptions/NotFoundExecpion'

import User from 'App/Models/User'

export default class UsersController {
  public async getUser({ params }: HttpContextContract) {
    // Fetch a user by ID
    const user = await User.find(params.id)

    if (!user) {
      return 'No user found'
    }

    return user
  }

  public async getAllUsers() {
    const users = await User.all()

    if (!users || users.length === 0) {
      return 'No users found'
    }

    return users
  }

  private async updateUser(id: number, newData: any) {
    // Fetch a user by ID
    const user = await User.find(id)

    if (!user) {
      return 'User not found'
    }

    // Update user data
    user.merge(newData)
    await user.save()

    return user
  }

  public async deleteUser(id: any) {
    // Fetch a user by ID
    const user = await User.find(id)

    if (!user) {
      return 'User not found'
    }

    // Delete the user
    await user.delete()

    return 'User deleted'
  }
}
