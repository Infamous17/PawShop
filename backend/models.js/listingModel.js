const mongoose = require('mongoose');

const listingSchema = mongoose.Schema({
    category: { type: String, required: true },
    petName: { type: String, required: true },
    gender: { type: String, required: true },
    breed: { type: String, required: true },
    breedType: { type: String, required: true },
    vaccinated: { type: String, required: true },
    neutered: { type: String, required: true },
    houseTrained: { type: String, required: true },
    years: { type: String, required: true },
    months: { type: String, required: true },
    kgs: { type: String, required: true },
    reason: { type: String, required: true },
    description: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    photo: { type: String, required: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
}, {
    timestamps: true
});

const Listing = mongoose.model("Listings", listingSchema);

module.exports = Listing;