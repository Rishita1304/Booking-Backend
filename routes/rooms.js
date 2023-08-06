import express from 'express'
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom, updateRoomAvailability } from '../controllers/rooms.js';
import { isAdmin } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/:hotelId', isAdmin, createRoom);

router.delete('/:id/:hotelId' , isAdmin, deleteRoom);

router.put('/:id', isAdmin, updateRoom);

router.get('/find/:id', getRoom);

router.get('/', getAllRooms);

router.put("/availability/:id", updateRoomAvailability);

export default router;