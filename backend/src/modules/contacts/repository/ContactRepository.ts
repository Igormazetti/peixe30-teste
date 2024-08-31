import { Contact } from '@prisma/client';
import { prisma } from '../../../database/prismaClient';

interface ContactPayload {
  name: string;
  lastName: string;
  phoneNumber: string;
  birthDate: Date;
  address: string;
  email: string;
  userId: string;
}

interface UpdateContactPayload {
  name?: string;
  lastName?: string;
  phoneNumber?: string;
  birthDate?: Date;
  address?: string;
  email?: string;
}

export default class ContactRepository {
  private db: typeof prisma.contact;

  constructor() {
    this.db = prisma.contact;
  }

  public async createContact({
    name,
    lastName,
    phoneNumber,
    birthDate,
    address,
    email,
    userId,
  }: ContactPayload): Promise<void> {
    await this.db.create({
      data: { name, lastName, phoneNumber, birthDate, address, email, userId },
    });
  }

  public async getContactsByUserId(userId: string): Promise<Contact[]> {
    const contacts = await this.db.findMany({
      where: { userId },
    });

    return contacts;
  }

  public async getContactById(id: string) {
    const contact = await this.db.findUnique({
      where: { id },
    });

    return contact;
  }

  public async getContactByName(
    userId: string,
    name: string,
    lastName: string,
  ) {
    const contact = await this.db.findFirst({
      where: {
        name,
        lastName,
        userId,
      },
    });

    return contact;
  }

  public async updateContact(id: string, data: UpdateContactPayload) {
    await this.db.update({
      where: { id },
      data,
    });
  }

  public async deleteContact(id: string) {
    await this.db.delete({
      where: { id },
    });
  }
}
