import express from 'express'
import { bycity, bycitycount, bytype, createHotel, deleteHotel, getAllHotels, getHotel, getHotelRooms, updateHotel } from '../controllers/hotels.js';
import { isAdmin } from '../utils/verifyToken.js';


const router = express.Router();


router.post('/:id',isAdmin, createHotel);
router.put('/:id',isAdmin, updateHotel);
router.delete('/:id',isAdmin, deleteHotel);

router.get('/', getAllHotels);
router.get('/find/:id', getHotel);
router.get('/bycity', bycity);
router.get('/bycitycount', bycitycount);
router.get('/bytype', bytype);
router.get('/room/:id', getHotelRooms);

export default router;