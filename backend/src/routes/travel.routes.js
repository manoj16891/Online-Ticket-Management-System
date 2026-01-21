const router = require("express").Router();
const { protect } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");
const {
  createTravel,
  getAgentTravels,
  searchTravels
} = require("../controllers/travel.controller");

router.post(
  "/",
  protect,
  authorize("agent"),
  createTravel
);

router.get(
  "/agent",
  protect,
  authorize("agent"),
  getAgentTravels
);



router.get("/search", searchTravels);

module.exports = router;
