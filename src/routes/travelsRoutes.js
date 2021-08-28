const express = require("express")
const router = express.Router()
const passengersController = require("../controllers/passengersControllers")
const travelsController = require("../controllers/travelsControllers")



router.get("/travels", travelsController.getAllTravels)
router.get("/travels/:id", travelsController.getTravelById)

router.post("/travels/:id/passenger/create",passengersController.createPerson)

router.put("/travels/:id/editdriver", travelsController.driverEdit)
router.patch("/travels/:id/updatedriver", travelsController.replaceDriver)

router.delete("/travels/:id/delete", travelsController.deleteTravel)



router.get("/passengers", passengersController.getAllPassengers)
router.get("/passengers/:id", passengersController.getPassengerById)

router.put("/passengers/:id/update", passengersController.replacePassenger)
router.patch("/passengers/:id/updatename", passengersController.updateName)

router.delete("/passenger/:id/delete", passengersController.deletePerson)


module.exports = router  
 
