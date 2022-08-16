import { Success } from "../domain/Success";
import { Contact, ContactToInsert } from "../domain/Contact"; 
import ContactModel from "../models/contactModel";
import cloudinary from "../config/cloudinary";
import fs from 'fs';


export const getAllContacts = async (authUser: number | undefined): 
Promise<Success<Contact[]>> => {
    const contacts = await ContactModel.getAllContacts(authUser);

    return {
        data: contacts,
        message: "All Contacts retrieved succesfully.",
    }
}



export const addContact = async (
    contactDetails: ContactToInsert
  ): Promise<Success<Contact>> => {
    try {
      if (!fs.existsSync(contactDetails.photo)) {
        throw new Error("File not found!");
      }
      const uploadResponse = await cloudinary.uploader.upload(
        contactDetails.photo,
        {
          upload_preset: "cloudinary-test",
        }
      );
  
      const url = uploadResponse.url;
  
      fs.unlinkSync(contactDetails.photo);
  
      const contact = await ContactModel.addContact({
        ...contactDetails,
        photo: url,
      });
  
      return {
        data: contact,
        message: "Contact Added Successfully!",
      };
    } catch (error) {
      console.log("error:::", error);
      fs.unlinkSync(contactDetails.photo);
      return {
        message: "Cannot add contact!",
      };
    }
  };




  export const updateContact = async (
    contactDetails: Contact
  ): Promise<Success<Contact>> => {
    try {
      if (!fs.existsSync(contactDetails.photo)) {
        throw new Error("File not found!");
      }
      const uploadResponse = await cloudinary.uploader.upload(
        contactDetails.photo,
        {
          upload_preset: "cloudinary-test",
        }
      );
  
      const url = uploadResponse.url;
  
      fs.unlinkSync(contactDetails.photo);
  
      const contact = await ContactModel.updateContact({
        ...contactDetails,
        photo: url,
      });
  
      return {
        data: contact,
        message: "Contact Added Successfully!",
      };
    } catch (error) {
      console.log("error:::", error);
      fs.unlinkSync(contactDetails.photo);
      return {
        message: "Cannot add contact!",
      };
    }
  };



  export const deleteContact = async (
    id: number
  ): Promise<Success<void>> => {
    const contact = await ContactModel.deleteContact(id);
  
    return {
        data: contact,
        message: "Contact Deleted Successfully!",
    };
  };