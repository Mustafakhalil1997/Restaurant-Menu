const express = require("express");

const checkAuth = require("../middleware/check-auth");
const router = express.Router();

const {
  addItem,
  getItems,
  deleteItem,
  editItem,
} = require("../controllers/item-controller");

// router.use(checkAuth);

router.get("/", getItems);
router.post("/", addItem);
router.delete("/:itemId", deleteItem);
router.patch("/:itemId", editItem);

module.exports = router;
