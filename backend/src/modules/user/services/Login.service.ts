import UserRepository from '../repository/UserRepository';
import Encrypt from '../../../utils/hash';
import Token from '../../../utils/jwt';

export default class LoginService {
  private userRepository: UserRepository;

  private encrypt: Encrypt;

  constructor() {
    this.userRepository = new UserRepository();
    this.encrypt = new Encrypt();
  }

  public async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return {
        status: 404,
        errorMessage: 'Usuário não encontrado!',
      };
    }

    const checkHash = this.encrypt.checkPassword(password, user.password);

    if (!checkHash) {
      return {
        status: 401,
        errorMessage: 'Senha inválida!',
      };
    }

    const tokenInstance = new Token();

    const token = tokenInstance.createToken(String(user.id));

    return {
      status: 200,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        valid: user.valid,
      },
      token,
    };
  }
}
