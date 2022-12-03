const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const Item = require("../models/item");
const Category = require("../models/category");

const getItems = async (req, res, next) => {
  let items;
  try {
    items = await Item.find();
  } catch (err) {
    const error = new HttpError("Could not get items, try again", 500);
    return next(error);
  }

  res.status(200).json({ message: "Item retrieved", items });
};

const addItem = async (req, res, next) => {
  const { name, description, price, image } = req.body;

  let existingItem;
  try {
    existingItem = await Item.findOne({ name: name });
  } catch (err) {
    const error = new HttpError("Could not add item, try again", 500);
    return next(error);
  }

  if (existingItem) {
    const error = new HttpError("Item already exists", 404);
    return next(error);
  }

  const createdItem = new Item({
    name,
    description,
    price,
    image,
    categoryId: null,
  });

  try {
    await createdItem.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Could not add item, try again", 500);
    return next(error);
  }

  res.status(201).json({ message: "item added successfully" });
};

const editItem = async (req, res, next) => {
  const _id = req.params.itemId;

  let existingItem;
  let existingCategory;
  try {
    existingItem = await Item.findById(_id);
    existingCategory =
      req.body.categoryId && (await Category.findById(req.body.categoryId));
  } catch (err) {
    console.log(err);
    const error = new HttpError("Could not update item, try again", 500);
    return next(error);
  }

  if (!existingItem) {
    const error = new HttpError("Item not found", 404);
    return next(error);
  }

  const prevCategoryId = existingItem.categoryId;

  let prevCategory;
  if (prevCategoryId) {
    try {
      prevCategory = await Category.findById(prevCategoryId);
      newItems = prevCategory.items.filter((item) => item.toString() !== _id);
      prevCategory.items = newItems;
    } catch (err) {
      const error = new HttpError("Could not update item, try again", 500);
      return next(error);
    }
  }

  const { name, description, image, price, categoryId } = req.body;

  existingItem.name = name;
  existingItem.description = description;
  existingItem.price = price;
  existingItem.image = image;
  existingItem.categoryId = categoryId;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    if (existingCategory) {
      existingCategory.items.push(_id);
      await existingCategory.save({ session: sess });
    }
    if (prevCategory) await prevCategory.save({ session: sess });
    await existingItem.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Could not update item", 500);
    return next(error);
  }

  res.status(201).json({ message: "Item updated successfully" });
};

const deleteItem = async (req, res, next) => {
  const _id = req.params.itemId;

  let existingItem;
  try {
    existingItem = await Item.findById(_id);
  } catch (err) {
    const error = new HttpError("Could not delete item, try again", 500);
    return next(error);
  }

  if (!existingItem) {
    const error = new HttpError("Item not found", 404);
    return next(error);
  }

  if (!existingItem.categoryId) {
    try {
      await Item.findByIdAndDelete(_id);
    } catch (err) {
      const error = new HttpError("Could not delete item, try again", 500);
      return next(error);
    }
    return res.status(200).json({ message: "Item deleted successfully" });
  }

  const categoryId = existingItem.categoryId;

  let existingCategory;
  try {
    existingCategory = await Category.findById(categoryId);
  } catch (err) {
    const error = new HttpError("Could not find delete item", 500);
    return next(error);
  }

  const newItems = existingCategory.items.filter(
    (item) => item.toString() !== _id
  );

  existingCategory.items = newItems;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await existingCategory.save({ session: sess });
    await Item.deleteOne({ _id: _id });
    await sess.commitTransaction();
  } catch (err) {
    return next(err);
  }

  res.status(200).json({ message: "Item deleted successfully" });
};

module.exports = { addItem, getItems, deleteItem, editItem };
