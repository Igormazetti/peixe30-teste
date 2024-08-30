import { User } from '@prisma/client';
import { prisma } from '../../../database/prismaClient';

interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export default class UserRepository {
  private db: typeof prisma.user;
  constructor() {
    this.db = prisma.user;
  }

  public async createUser({ name, email, password }: IUser): Promise<User> {
    const user = await this.db.create({
      data: {
        name,
        email,
        password,
      },
    });

    return user;
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.db.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.db.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
}
