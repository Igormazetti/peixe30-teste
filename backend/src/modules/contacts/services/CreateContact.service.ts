import ContactRepository from '../repository/ContactRepository';

interface IRequest {
  name: string;
  lastName: string;
  phoneNumber: string;
  birthDate: Date;
  address: string;
  email: string;
  userId: string;
}

export default class CreateContactService {
  private contactRepository: ContactRepository;

  constructor() {
    this.contactRepository = new ContactRepository();
  }

  public async execute({
    name,
    lastName,
    phoneNumber,
    birthDate,
    address,
    email,
    userId,
  }: IRequest) {
    const contact = await this.contactRepository.getContactByName(
      userId,
      name,
      lastName,
    );

    if (contact) {
      return {
        status: 422,
        errorMessage: 'Já existe contato cadastrado com este nome',
      };
    }

    await this.contactRepository.createContact({
      name,
      lastName,
      phoneNumber,
      birthDate,
      address,
      email,
      userId,
    });

    return {
      status: 200,
    };
  }
}
