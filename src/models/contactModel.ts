import db from "../db/db";
import { Contact, ContactToInsert } from "../domain/Contact";

class ContactModel {
  public static table = "contact_info";

  public static async getAllContacts(
    authUser: number | undefined
  ): Promise<Contact[]> {
    const contacts = await db(ContactModel.table)
      .where({ user_id: authUser })
      .select();

    return contacts;
  }

  public static async getContact(
    contactId: number,
    authUser: number | undefined
  ): Promise<Contact> {
    const contact = await db(ContactModel.table)
      .where({
        id: contactId,
        user_id: authUser,
      })
      .select()
      .first();

    return contact;
  }

  public static async addContact(
    contactDetails: ContactToInsert
  ): Promise<Contact[]> {
    const contact = await db(ContactModel.table)
      .insert(contactDetails)
      .returning("*");

    return contact;
  }

  public static async updateContact(contactDetails: Contact): Promise<Contact> {
    const [updatedDetails] = await db(ContactModel.table).where({
      id: contactDetails.id,
      user_id: contactDetails.user_id,
    });

    return updatedDetails;
  }

  public static async deleteContact(contactId: number): Promise<void> {
    await db(ContactModel.table).where({ id: contactId }).delete();
  }
}

export default ContactModel;
