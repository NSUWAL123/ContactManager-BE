import { Router } from "express";
import storage from '../config/multer'
import * as contactController from '../controllers/contactController'

const router = Router();

router.get('/', contactController.getAllContacts);
router.get("/:contactId", contactController.getContact);
router.post('/', storage.single('photo'), contactController.addContact);
router.put('/:contactId', storage.single('photo'), contactController.updateContact);
router.delete('/:contactId', contactController.deleteContact);


export default router;