import { Success } from "../domain/Success";
import { Contact, ContactToInsert } from "../domain/Contact";
import ContactModel from "../models/contactModel";
import cloudinary from "../config/cloudinary";
import fs from "fs";
import logger from "../misc/logger";

export const getAllContacts = async (
  authUser: number | undefined
): Promise<Success<Contact[]>> => {
  const contacts = await ContactModel.getAllContacts(authUser);
  logger.info("retrieving all contacts");
  return {
    data: contacts,
    message: "All Contacts retrieved succesfully.",
  };
};

export const getContact = async (
  id: number,
  authUser: number | undefined
): Promise<Success<Contact>> => {
  const contact = await ContactModel.getContact(id, authUser);
  return {
    data: contact,
    message: "Contact fetched Successfully!",
  };
};

export const addContact = async (
  contactDetails: ContactToInsert
): Promise<Success<Contact>> => {
  try {
    if (!fs.existsSync(contactDetails.photo!)) {
      throw new Error("File not found!");
    }
    const uploadResponse = await cloudinary.uploader.upload(
      contactDetails.photo!,
      {
        upload_preset: "contact-manager-cloudinary",
      }
    );

    const url = uploadResponse.url;

    fs.unlinkSync(contactDetails.photo!);

    const contact = await ContactModel.addContact({
      ...contactDetails,
      photo: url,
    });

    return {
      data: contact,
      message: "Successfully added contact",
    };
  } catch (error) {
    console.log("error", error);
    fs.unlinkSync(contactDetails.photo!);
    return {
      message: "Contact cannot be added",
    };
  }
};

export const updateContact = async (
  contactDetails: Contact
): Promise<Success<Contact>> => {
  try {
    let url = "";
    if (fs.existsSync(contactDetails.photo!)) {
      const uploadResponse = await cloudinary.uploader.upload(
        contactDetails.photo!,
        {
          upload_preset: "contact-manager-cloudinary",
        }
      );
      url = uploadResponse.url;
      fs.unlinkSync(contactDetails.photo!);
    }

    if (url !== "") {
      contactDetails.photo = url;
    } else {
      delete contactDetails.photo; //photo made optional to remove error
    }

    const contact = await ContactModel.updateContact(contactDetails);
    return {
      data: contact,
      message: "Successfully added contact",
    };
  } catch (error) {
    console.log("error", error);
    fs.unlinkSync(contactDetails.photo!);
    return {
      message: "Contact cannot be added",
    };
  }
};

export const deleteContact = async (id: number): Promise<Success<void>> => {
  const contact = await ContactModel.deleteContact(id);

  return {
    data: contact,
    message: "Contact Deleted Successfully!",
  };
};
