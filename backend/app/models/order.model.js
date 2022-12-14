const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String, 
            required: true,
        },
        ward: {
            type: String, 
            required: true,
        },
        district: {
            type: String, 
            required: true,
        },
        city: {
            type: String, 
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
    },
    orderItems: [
        {
            name: {
                type: String, 
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            image: {
                type: String, 
                required: true,
            },
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                required: true,
            },
        },
    ],
    user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
    },
    shippingPrice: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Đang xử lý",
    },
    deliveryAt: Date,
    createAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Order", orderSchema);