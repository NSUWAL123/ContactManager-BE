import { Response, NextFunction } from "express";
import { AuthRequest } from "../domain/user";
import * as contactService from '../services/contactService'

export const getAllContacts = (req: AuthRequest, res: Response, next:NextFunction) => {
    contactService
        .getAllContacts(req.authUser)
        .then((data) => res.json(data))
        .catch((err) => next(err))
}


export const addContact = (req: AuthRequest, res: Response, next: NextFunction
  ) => {
    const photo = req.file?.path + "";
    const currUser = req.authUser;
    const { name, phone, email, address, is_favourite } = req.body;
  
    contactService
      .addContact({
        name,
        phone, 
        email, 
        address,
        photo,
        is_favourite,
        user_id: currUser,
      })
      .then((data) => res.json(data))
      .catch((err) => next(err));
  };


  export const updateContact = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const photo = req.file?.path + "";
    const currentUser = req.authUser;
    const { name, phone, email, address, is_favourite } =
      req.body;
  
    contactService
      .updateContact({
        id: +id,
        name,
        phone,
        email,
        address,
        photo,
        is_favourite,
        user_id: currentUser,
      })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(err);
      });
  };


  export const deleteContact = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
  
    contactService
      .deleteContact(+id) //.deleteContact(+id, req.authUser)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(err);
      });
  };


  