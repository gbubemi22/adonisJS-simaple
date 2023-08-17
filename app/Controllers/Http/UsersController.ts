// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

export default class UsersController {
  public async getUser(id: number) {
    // Fetch a user by ID
    const user = await User.find(id)

    if (!user) {
      return 'User not found'
    }

    return user
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

  public async deleteUser(id) {
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
