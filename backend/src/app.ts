import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import contactRouter from './modules/contacts/routes/ContactRoutes';
import userRouter from './modules/user/routes/UserRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', userRouter);
app.use('/contacts', contactRouter);

export default app;
