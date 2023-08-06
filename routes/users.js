import express from 'express'
import { deleteUser, getAllUsers, getUser, updateUser } from '../controllers/users.js';
import { isAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/:id', verifyUser, getUser);

router.get('/', isAdmin, getAllUsers);

router.delete(':id' , verifyUser, deleteUser);

router.put('/:id', verifyUser, updateUser);

export default router;