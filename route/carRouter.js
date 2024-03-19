const express = require("express");

const router = express.Router(); 

const carController = require("../controllers/carController")


router.route('/')
.get(carController.getCarsData)
.post(carController.createcar);

router.route('/:id')
.get(carController.getCarDataById)
.patch(carController.updateCar)
.delete(carController.deleteCar);
module.exports = router;