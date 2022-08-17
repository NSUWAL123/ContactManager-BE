export interface Contact {
  id: number;
  name: string;
  phone: number;
  email: string;
  address: string;
  photo: string;
  is_favourite: boolean;
  user_id: number | undefined;
}

export type ContactToInsert = Omit<Contact, "id">;
