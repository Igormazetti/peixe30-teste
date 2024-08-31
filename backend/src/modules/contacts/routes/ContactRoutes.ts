import { Router } from 'express';
import ContactController from '../controllers/ContactController';
import { authMiddleware } from '../../../middleware/authMiddleware';

const contactRouter = Router();
const contactController = new ContactController();

contactRouter.get('/', authMiddleware, contactController.getContactsByUser);
contactRouter.post('/create', authMiddleware, contactController.create);
contactRouter.patch('/update/:id', authMiddleware, contactController.update);
contactRouter.delete('/delete/:id', authMiddleware, contactController.delete);

export default contactRouter;
