import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { object, string, date } from 'yup';
import CreateContactService from '../services/CreateContact.service';
import UpdateContactService from '../services/UpdateContact.service';
import GetContactsByUserService from '../services/GetContactsByUser.service';
import DeleteContactService from '../services/DeleteContact.service';

const CreateContactSchema = object({
  name: string().required(),
  lastName: string().required(),
  phoneNumber: string().required(),
  birthDate: date().required(),
  address: string().required(),
  email: string().required(),
});

const UpdateContactSchema = object({
  name: string(),
  lastName: string(),
  phoneNumber: string(),
  birthDate: date(),
  address: string(),
  email: string(),
});

export default class ContactController {
  public async create(request: Request, response: Response) {
    const { name, lastName, phoneNumber, birthDate, address, email } =
      await CreateContactSchema.validate(request.body);

    const creteContactService = container.resolve(CreateContactService);

    const userId = request.user.id;

    const contact = await creteContactService.execute({
      name,
      lastName,
      phoneNumber,
      birthDate,
      address,
      email,
      userId,
    });

    return response.status(contact.status).json(contact);
  }

  public async getContactsByUser(request: Request, response: Response) {
    const userId = request.user.id;
    console.log(userId);
    const getContactsByUserService = container.resolve(
      GetContactsByUserService,
    );
    const contacts = await getContactsByUserService.execute(userId);

    return response.status(contacts.status).json(contacts);
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params;

    const { name, lastName, phoneNumber, birthDate, address, email } =
      await UpdateContactSchema.validate(request.body);

    const updateContactService = container.resolve(UpdateContactService);

    const update = await updateContactService.execute({
      id,
      name,
      lastName,
      phoneNumber,
      birthDate,
      address,
      email,
    });

    return response.status(update.status).json(update);
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;

    const deleteContactService = container.resolve(DeleteContactService);

    await deleteContactService.execute({ id });

    return response.status(200).json({ message: 'Contact deleted.' });
  }
}
