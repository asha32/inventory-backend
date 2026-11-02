const inventory = require("../model/inventoryData");

// Add a new inventory item
const addItem = (req, res) => {
    const newItem = {
        id: Date.now(),
        name: req.body.name,
        category: req.body.category,
        quantity: req.body.quantity,
        price: req.body.price
    };

    inventory.push(newItem);

    res.status(201).json({
        message: "Item added successfully",
        item: newItem
    });
};

// Get all inventory items
const getAllItems = (req, res) => {
    res.status(200).json(inventory);
};

// Get a single item
const getItemById = (req, res) => {
    const item = inventory.find(
        (item) => item.id === Number(req.params.id)
    );

    if (!item) {
        return res.status(404).json({
            message: "Item not found"
        });
    }

    res.status(200).json(item);
};

// Update an item
const updateItem = (req, res) => {
    const item = inventory.find(
        (item) => item.id === Number(req.params.id)
    );

    if (!item) {
        return res.status(404).json({
            message: "Item not found"
        });
    }

    item.name = req.body.name ?? item.name;
    item.category = req.body.category ?? item.category;
    item.quantity = req.body.quantity ?? item.quantity;
    item.price = req.body.price ?? item.price;

    res.status(200).json({
        message: "Item updated successfully",
        item
    });
};

// Delete an item
const deleteItem = (req, res) => {
    const index = inventory.findIndex(
        (item) => item.id === Number(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Item not found"
        });
    }

    const deletedItem = inventory.splice(index, 1);

    res.status(200).json({
        message: "Item deleted successfully",
        item: deletedItem[0]
    });
};


// Filter inventory items
const filterItems = (req, res) => {
    let filteredItems = [...inventory];

    const { category, minQuantity, maxQuantity } = req.query;

    if (category) {
        filteredItems = filteredItems.filter(
            (item) => item.category.toLowerCase() === category.toLowerCase()
        );
    }

    if (minQuantity !== undefined) {
        filteredItems = filteredItems.filter(
            (item) => item.quantity >= Number(minQuantity)
        );
    }

    if (maxQuantity !== undefined) {
        filteredItems = filteredItems.filter(
            (item) => item.quantity <= Number(maxQuantity)
        );
    }

    res.status(200).json(filteredItems);
};

// Search inventory items by name
const searchItems = (req, res) => {
    const { name } = req.query;

    if (!name) {
        return res.status(400).json({
            message: "Please provide an item name to search"
        });
    }

    const results = inventory.filter(
        (item) => item.name.toLowerCase().includes(name.toLowerCase())
    );

    res.status(200).json(results);
};


module.exports = {
    addItem,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem,
    filterItems,
    searchItems
};