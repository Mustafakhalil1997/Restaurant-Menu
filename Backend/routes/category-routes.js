const express = require("express");

const checkAuth = require("../middleware/check-auth");
const router = express.Router();

const {
  getCategories,
  addCategory,
  deleteCategory,
  editCategory,
  // addItemToCategory,
} = require("../controllers/category-controller");

router.get("/", getCategories);

// router.use(checkAuth);

router.post("/", addCategory);
router.delete("/:categoryId", deleteCategory);

// router.patch("/:categoryId/addItem/:itemId", addItemToCategory);
router.patch("/:categoryId", editCategory);

module.exports = router;
