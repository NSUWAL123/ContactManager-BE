import { Router } from "express";
import storage from '../config/multer'
import * as contactController from '../controllers/contactController'

const router = Router();

router.get('/', contactController.getAllContacts);
router.post('/', storage.single('photograph'), contactController.addContact);
router.put('/:contactId', storage.single('photograph'), contactController.updateContact);
router.delete('/:contactId', contactController.deleteContact);


export default router;