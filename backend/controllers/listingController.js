const Favorite = require("../models.js/favoriteModel");
const Listing = require("../models.js/listingModel");
const asyncHandler = require('express-async-handler');
const User = require("../models.js/userModel");

//LISTINGS ROUTE CONTROLLER
const createListing = asyncHandler(async (req, res) => {
    const { category, petName, gender, breed, breedType, vaccinated, neutered, houseTrained, years, months, kgs, reason, description, city, state, photo, userId } = req.body;

    const listing = await Listing.create({
        category,
        petName,
        gender,
        breed,
        breedType,
        vaccinated,
        neutered,
        houseTrained,
        years,
        months,
        kgs,
        reason,
        description,
        city,
        state,
        photo,
        userId
    });

    if (listing) {
        res.json({
            _id: listing._id,
            category: listing.category,
            petName: listing.petName,
            gender: listing.gender,
            breed: listing.breed,
            breedType: listing.breedType,
            vaccinated: listing.vaccinated,
            neutered: listing.neutered,
            houseTrained: listing.houseTrained,
            years: listing.years,
            months: listing.months,
            kgs: listing.kgs,
            reason: listing.reason,
            description: listing.description,
            city: listing.city,
            state: listing.state,
            photo: listing.photo,
            userId: listing.userId
        });
    } else {
        res.status(400);
        throw new Error("Failed to create listing");
    }

});

const fetchListing = asyncHandler(async (req, res) => {
    try {
        const listings = await Listing.find({ userId: req.user._id }).populate("userId", "name");
        res.send(listings);
    } catch (error) {
        res.status(500).json({ error: "Error fetching listings" + error });
    }

});

const deleteListing = asyncHandler(async (req, res) => {
    const listingId = req.params.id;
    await Listing.findByIdAndDelete(listingId);
    res.json({ message: "Listing deleted successfully" });
});

const fetchEditListing = asyncHandler(async (req, res) => {
    const itemId = req.params.id;
    try {
        const editListing = await Listing.findById(itemId);
        res.send(editListing);
    } catch (error) {
        res.status(500).json({ error: "Error fetching listings" + error });
    }
});

const updateListing = asyncHandler(async (req, res) => {
    const itemId = req.params.id;
    try {
        const update = await Listing.findByIdAndUpdate(
            itemId,
            { $set: req.body },
            { new: true }
        );
        res.json({ message: "Updated" });
    } catch (error) {
        res.status(500).json({ error: "Error updating listings" + error });
    }
});

//ADOPT ROUTE CONTROLLER
const fetchAllListings = asyncHandler(async (req, res) => {
    const filter = req.query;
    const listings = await Listing.find(filter).populate("userId", "name");
    res.send(listings);
});

const createFavorite = asyncHandler(async (req, res) => {
    const itemId = req.params.itemId;
    const userId = req.params.userId;

    try {
        let userFavExist = await Favorite.findById(userId);

        if (userFavExist) {
            // Check if the item is already in favorites
            if (userFavExist.favorites.includes(itemId)) {
                return res.json({ message: "Already in favorites" });
            }
            userFavExist.favorites.push(itemId);
            await userFavExist.save();
        } else {
            userFavExist = new Favorite({
                _id: userId,
                favorites: [itemId],
            });
            await userFavExist.save();
        }

        res.json({ message: "success" });
    } catch (error) {
        res.json({ message: "error" });
    }

});

//FAVORITE ROUTE CONTROLLER
const fetchFavoriteId = asyncHandler(async (req, res) => {
    try {
        const favorite = await Favorite.findById(req.user._id);
        res.send(favorite);
    } catch (error) {
        res.status(500).json({ error: "Error fetching favorites" + error });
    }
});

const fetchFavorite = asyncHandler(async (req, res) => {
    const favtId = req.params.id;
    try {
        const favorite = await Listing.findById(favtId).populate("userId", "name");
        res.send(favorite);
    } catch (error) {
        res.status(500).json({ error: "Error fetching favorite" + error });
    }

});

const removeFavorite = asyncHandler(async (req, res) => {
    const itemId = req.params.id
    try {
        const favorite = await Favorite.findById(req.user._id);
        favorite.favorites.pull(itemId);
        await favorite.save();
        res.json({ message: "Removed from favorites" });
    } catch (error) {
        res.status(500).json({ error: "Error removing favorites" + error });
    }
});

module.exports = { createListing, fetchListing, deleteListing, fetchAllListings, createFavorite, fetchFavoriteId, fetchFavorite, removeFavorite, fetchEditListing, updateListing };