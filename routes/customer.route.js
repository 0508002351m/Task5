const router = require("express").Router()
const controller = require ("../app/controllers/customer.controller")
router.get("/",controller.showAll)
router.get("/add",controller.addCust)
router.post("/add",controller.addLogCust)
router.get("/addoperation",controller.addOp)
router.post("/addoperation",controller.addLogOp)
router.get("/show",controller.show)
module.exports = router