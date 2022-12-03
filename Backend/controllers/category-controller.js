const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Category = require("../models/category");
const Item = require("../models/item");

const getCategories = async (req, res, next) => {
  // should get all categories

  let categories;
  try {
    categories = await fetchCategories();
  } catch (err) {
    return next(err);
  }

  if (!categories) {
    const error = new HttpError("Could not find any category");
    return next(error);
  }

  res.status(200).json({
    categories: categories,
    message: "This is category route",
  });
};

const addCategory = async (req, res, next) => {
  const { name } = req.body;

  try {
    await checkExistingCategory(name);
    await saveCreatedCategory(name);
  } catch (err) {
    return next(err);
  }

  res.status(200).json({ message: `Category ${name} added successfully` });
};

const deleteCategory = async (req, res, next) => {
  const categoryId = req.params.categoryId;

  let existingCategory;
  try {
    existingCategory = await fetchCategoryById(categoryId);
  } catch (err) {
    return next(err);
  }

  const items = existingCategory.items;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await Category.findByIdAndDelete(categoryId).session(sess);
    await Item.updateMany({ _id: items }, { categoryId: null }).session(sess);
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Could not delete category", 500);
    return next(error);
  }

  res.status(200).json({ message: "category deleted successfully" });
};

const editCategory = async (req, res, next) => {
  const categoryId = req.params.categoryId;
  let existingCategory;
  try {
    existingCategory = await Category.findByIdAndUpdate(categoryId, req.body, {
      new: true,
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError("Could not update category, try again", 500);
    return next(error);
  }

  if (!existingCategory) {
    const error = new HttpError("Category not found", 404);
    return next(error);
  }

  res.status(200).json({ message: "category updated successfully" });
};

////////////////

const fetchCategories = async () => {
  let categories;
  try {
    categories = await Category.find().populate("items");
    return categories;
  } catch (err) {
    const error = new HttpError("Could not get Categories", 500);
    throw error;
  }
};

const checkExistingCategory = async (name) => {
  let existingCategory;
  try {
    existingCategory = await Category.findOne({ name: name });
  } catch (err) {
    console.log(err);
    throw new HttpError("Could not add Category", 500);
  }

  if (existingCategory) {
    throw new HttpError("Category already exists", 404);
  }
};

const saveCreatedCategory = async (name) => {
  const createdCategory = new Category({
    name: name,
    items: [],
  });

  try {
    await createdCategory.save();
  } catch (err) {
    throw new HttpError("Could not add Category", 500);
  }
};

const fetchCategoryById = async (id) => {
  let existingCategory;
  try {
    existingCategory = await Category.findById(id);
  } catch (err) {
    throw new HttpError("Could not delete category, try again", 500);
  }

  if (!existingCategory) {
    throw new HttpError("Category not found", 404);
  }

  return existingCategory;
};

module.exports = {
  getCategories,
  addCategory,
  deleteCategory,
  editCategory,
};
