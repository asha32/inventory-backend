// Validate a new inventory item
const validateNewItem = (req, res, next) => {
    const { name, category, quantity, price } = req.body;

    if (!name || !category) {
        return res.status(400).json({
            message: "Name and category are required"
        });
    }

    if (typeof quantity !== "number" || quantity < 0) {
        return res.status(400).json({
            message: "Quantity must be a non-negative number"
        });
    }

    if (typeof price !== "number" || price < 0) {
        return res.status(400).json({
            message: "Price must be a non-negative number"
        });
    }

    next();
};

// Validate an inventory item update
const validateUpdateItem = (req, res, next) => {
    const { name, category, quantity, price } = req.body;

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "Provide at least one field to update"
        });
    }

    if (name !== undefined && (typeof name !== "string" || !name.trim())) {
        return res.status(400).json({
            message: "Name must be a non-empty string"
        });
    }

    if (category !== undefined && (typeof category !== "string" || !category.trim())) {
        return res.status(400).json({
            message: "Category must be a non-empty string"
        });
    }

    if (quantity !== undefined && (typeof quantity !== "number" || quantity < 0)) {
        return res.status(400).json({
            message: "Quantity must be a non-negative number"
        });
    }

    if (price !== undefined && (typeof price !== "number" || price < 0)) {
        return res.status(400).json({
            message: "Price must be a non-negative number"
        });
    }

    next();
};

module.exports = {
    validateNewItem,
    validateUpdateItem
};