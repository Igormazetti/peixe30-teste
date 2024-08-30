import UserRepository from '../../user/repository/UserRepository';
import ContactRepository from '../repository/ContactRepository';

export default class GetContactsByUserService {
  private contactRepository: ContactRepository;
  private userRepository: UserRepository;

  constructor() {
    this.contactRepository = new ContactRepository();
    this.userRepository = new UserRepository();
  }

  public async execute(userId: string) {
    const existingUser = await this.userRepository.findById(userId);

    if (!existingUser) {
      return {
        status: 404,
        errorMessage: 'Usuário não encontrado!',
      };
    }

    const contacts = await this.contactRepository.getContactsByUserId(userId);

    return {
      status: 200,
      contacts,
    };
  }
}
