import ContactRepository from '../repository/ContactRepository';

interface IRequest {
  id: string;
}

export default class DeleteContactService {
  private contactRepository: ContactRepository;

  constructor() {
    this.contactRepository = new ContactRepository();
  }

  public async execute({ id }: IRequest) {
    const contact = await this.contactRepository.getContactById(id);

    if (!contact) {
      return {
        status: 404,
        errorMessage: 'Contato não encontrado',
      };
    }

    await this.contactRepository.deleteContact(id);

    return {
      status: 200,
    };
  }
}
