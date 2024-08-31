export interface Contact {
  id: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  birthDate: Date;
  address: string;
  email: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EditContactProps {
  name?: string;
  lastName?: string;
  phoneNumber?: string;
  birthDate?: string;
  address?: string;
  email?: string;
}

export interface AddContactProps {
  name: string;
  lastName: string;
  phoneNumber: string;
  birthDate: string;
  address: string;
  email: string;
}
