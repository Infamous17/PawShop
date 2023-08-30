const express = require("express");
const { createListing, fetchListing, deleteListing, fetchAllListings, createFavorite, fetchFavoriteId, fetchFavorite, removeFavorite, fetchEditListing, updateListing } = require("../controllers/listingController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/rehome").post(createListing);
router.route("/listings").get(protect, fetchListing);
router.route("/listings/:id").delete(deleteListing);
router.route("/listings/edit/:id").get(fetchEditListing).patch(updateListing);
router.route("/adopt").get(protect, fetchAllListings);
router.route("/adopt/:userId/:itemId").post(createFavorite);
router.route("/favorites").get(protect, fetchFavoriteId);
router.route("/favorites/:id").get(fetchFavorite);
router.route("/favorites/:id").delete(protect, removeFavorite);

module.exports = router;