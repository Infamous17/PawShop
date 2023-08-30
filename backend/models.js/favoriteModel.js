const mongoose = require('mongoose');

const favoriteSchema = mongoose.Schema({
    _id: { type: String, required: true },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }],
});

const Favorite = mongoose.model("Favouties", favoriteSchema);

module.exports = Favorite;