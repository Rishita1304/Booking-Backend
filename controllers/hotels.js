import Hotel from "../models/Hotel.js";
import _ from 'lodash';
import Room from "../models/Room.js"

export const createHotel = async (req, res, next) => {
  try {
    const newHotel = new Hotel({ ...req.body });
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateHotel = async (req,res,next) =>{
  try{
    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {$new: true})
    res.status(201).json(updatedHotel);
}catch(err){
    res.status(500).json(err);
}
}

export const deleteHotel = async(req,res,next) =>{
  try{
    await Hotel.findByIdAndDelete(req.params.id)
    res.status(201).json("Hotel Deleted Successful!")
  }catch(err){
    res.status(200).json(err)
  }
}

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getAllHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      price: { $gt: min || 1, $lt: max || 80 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const bycity = async (req, res) => {
  const citie = req.query.cities && req.query.cities.split(",");
  const cities = _.lowerCase(citie);
  try {
    const list = await Promise.all(
      cities.forEach((city) => {
        return Hotel.find({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const bycitycount = async (req, res, next) => {
  const cities = req.query.cities && req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const bytype = async (req, res, next) => {
  try {
    const allHotel = await Hotel.countDocuments({ type: "Hotel" });
    const allApartment = await Hotel.countDocuments({ type: "Apartment" });
    const allResort = await Hotel.countDocuments({ type: "Resort" });
    const allCabin = await Hotel.countDocuments({ type: "Cabin" });

    res.status(200).json([
      { type: "Hotel", count: allHotel },
      { type: "Apartment", count: allApartment },
      { type: "Resort", count: allResort },
      { type: "Cabin", count: allCabin },
    ]);
  } catch (err) {
    res.status(500).json(err);
  }
};


export const getHotelRooms = async (req, res, next) => {
  try{
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(hotel.rooms.map((room)=>{
      return Room.findById(room)
    })
    );
    res.status(200).json(list);
  }catch(err){
    res.status(500).json(err);
  }
}