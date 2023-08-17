import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract) {
    if (error.code === 'E_INVALID_AUTH_TOKEN') {
      return ctx.response.unauthorized('Invalid authentication token')
    }

    if (error.code === 'E_ROUTE_NOT_FOUND') {
      return ctx.response.notFound('Route not found')
    }

    // Handle other exceptions
    return super.handle(error, ctx)
  }
}
