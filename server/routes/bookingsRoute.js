const express = require('express');
const router = express.Router();
const Booking = require("../models/booking");
const Room = require('../models/room');
const moment = require('moment');
router.post("/bookroom", async (req, res) => {
  const {
    room,
    userid,
    fromdate,
    todate,
    totalamount,
    totaldays
  } = req.body;

  try {
    const newbooking = new Booking({
      room: room.name,
      roomid: room._id,
      userid,
      fromdate: moment(fromdate).format('MM-DD-YYYY'),
      todate: moment(todate).format('MM-DD-YYYY'),
      totalamount,
      totaldays,
      transactionId: '1234'
    });

    const booking = await newbooking.save()
    const roomtemp = await Room.findOne({ _id: room._id })
    roomtemp.curentbookings.push({ bookingid: booking._id, 
      fromdate: moment(fromdate).format('DD-MM-YYYY'), 
      todate: moment(todate).format("DD-MM-YYYY"), 
      userid: userid,
      status: booking.status
    }),
    await roomtemp.save()
    res.send('Room booked Successfully!')
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
