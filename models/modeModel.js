const mongoose = require('mongoose')

const modeScheme = mongoose.model("mode", new mongoose.Schema(
    {
        price: {
            type: Number,
            required: true,
            trim: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        image: {
            type: Array,
            required: true
        },
        reference: {
            type: String,
            trim: true,
            required: true
        },
        color: {
            type: String,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        }
    }
)
)
module.exports = modeScheme