import { Request, Response } from 'express';
import { container } from 'tsyringe';
import LoginService from '../services/Login.service';

export default class UserController {
  public async login(request: Request, response: Response) {
    const { email, password } = request.body;

    const loginService = container.resolve(LoginService);

    const session = await loginService.execute(email, password);

    return response.status(session.status).json(session);
  }
}
