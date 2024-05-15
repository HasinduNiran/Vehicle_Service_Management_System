import mongoose from "mongoose";

// Defining the Inventory Schema
const inventorySchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
        unique: true,
    },
    Location: {
        type: String,
        required: true,
    },
    Quantity: {
        type: Number,
        required: true,
    },
    PurchasedPrice: {
        type: Number,
        required: true,
    },
    SellPrice: {
        type: Number,
        required: true,
    },
    SupplierName: {
        type: String,
        required: true,
    },
    SupplierPhone: {
        type: String,
        required: true,
    },
    SupplierEmail: {
        type: String,
        required: true,
    },
});

// Adding the timestamps option
inventorySchema.set('timestamps', true);

// Exporting the Inventory Model
export const Inventory = mongoose.model('Inventory', inventorySchema);




