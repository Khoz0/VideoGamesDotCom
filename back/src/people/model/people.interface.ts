export interface Person {
  id?: string;
  pseudo?: string;
  mail?: string;
  password?: string;
  role?: string;
}

export enum PersonRole {
  ADMIN = 'Admin',
  USER = 'User',
}
