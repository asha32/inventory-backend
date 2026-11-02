const express = require("express");

const router = express.Router();

const {
    addItem,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem,
    filterItems,
    searchItems
} = require("../controllers/inventoryController");

const {
    validateNewItem,
    validateUpdateItem
} = require("../middleware/validation");

// Add an item
router.post("/", validateNewItem, addItem);

// Get all items
router.get("/", getAllItems);

// Filter inventory items
router.get("/filter", filterItems);

// Search inventory items
router.get("/search", searchItems);

// Get one item by ID
router.get("/:id", getItemById);

// Update an item
router.put("/:id", validateUpdateItem, updateItem);

// Delete an item
router.delete("/:id", deleteItem);

module.exports = router;