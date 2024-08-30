import ContactRepository from '../repository/ContactRepository';

interface IRequest {
  id: string;
  name?: string;
  lastName?: string;
  phoneNumber?: string;
  birthDate?: Date;
  address?: string;
  email?: string;
}

export default class UpdateContactService {
  private contactRepository: ContactRepository;

  constructor() {
    this.contactRepository = new ContactRepository();
  }

  public async execute({
    id,
    name,
    lastName,
    phoneNumber,
    birthDate,
    address,
    email,
  }: IRequest) {
    const contact = await this.contactRepository.getContactById(id);

    if (!contact) {
      return {
        status: 404,
        errorMessage: 'Contato não encontrado',
      };
    }

    await this.contactRepository.updateContact(id, {
      name,
      lastName,
      phoneNumber,
      birthDate,
      address,
      email,
    });

    return {
      status: 200,
    };
  }
}
