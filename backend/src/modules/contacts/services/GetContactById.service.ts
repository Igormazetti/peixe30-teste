import ContactRepository from '../repository/ContactRepository';

export default class GetContactByIdService {
  private contactRepository: ContactRepository;

  constructor() {
    this.contactRepository = new ContactRepository();
  }

  public async execute(contactId: string) {
    const contact = await this.contactRepository.getContactById(contactId);

    if (!contact) {
      return {
        status: 404,
        errorMessage: 'Contato não encontrado',
      };
    }

    return {
      status: 200,
      contact,
    };
  }
}
