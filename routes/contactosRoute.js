import { Router } from "express";
import { getContactos, addContacto, getContactoById, deleteContactoById, updateContactoById } from "../controllers/contactosController.js";

const contactosRouter = Router();

contactosRouter.get('/', getContactos);
contactosRouter.post('/', addContacto);
contactosRouter.get('/:id', getContactoById);
contactosRouter.delete('/:id', deleteContactoById);
contactosRouter.put('/', updateContactoById);




export default contactosRouter;