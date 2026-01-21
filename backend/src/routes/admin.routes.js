const router = require("express").Router();
const { protect } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

router.get("/dashboard",
  protect,
  authorize("admin"),
  (req, res) => {
    res.json({ message: "Admin Dashboard" });
  }
);

module.exports = router;
