const { isLoggedIn } = require("../middlewares/checkAuth");
const { BranchRating } = require("../models/branchRating.model");
const { MealReview } = require("../models/mealReview.model");
const { errorMsg, successMsg } = require("../utils/response");

const router = require("express").Router();

// GET ALL Branch ratings
router.get("/branch", async (req, res) => {
  try {
    const ratings = await BranchRating.findAll();
    successMsg(res, "Here are the branch ratings", ratings);
  } catch (error) {
    console.log(error);
    errorMsg(res, "UNKNOWN ERROR", 500, error.message || error);
  }
});

// GET Meal rating
router.get("/meal", async (req, res) => {
  try {
    const ratings = await MealReview.findAll();
    successMsg(res, "Here are the meal ratings", ratings);
  } catch (error) {
    console.log(error);
    errorMsg(res, "UNKNOWN ERROR", 500, error.message || error);
  }
});

// Rate Branch
router.post("/branch/:id", isLoggedIn, async (req, res) => {
  if (!req.body.rating || !req.body.review) {
    return errorMsg(res, "rating and review are required", 400);
  }
  if (req.body.rating < 1 || req.body.rating > 5) {
    return errorMsg(res, "Rating must be between 1 and 5", 400);
  }
  req.body.branchId = req.params.id;
  req.body.customerId = req.user.id;
  req.body.authorName = req.user.first_name;
  try {
    let oldRating = await BranchRating.findOne({
      where: { customerId: req.user.id, branchId: req.params.id },
    });
    if (oldRating) {
      const rating = await oldRating.set(req.body).save();
      successMsg(res, "Review saved", rating, 201);
    } else {
      const rating = await BranchRating.create(req.body);
      successMsg(res, "Review saved", rating, 201);
    }
  } catch (error) {
    console.log(error);
    errorMsg(res, "UNKNOWN ERROR", 500, error.message || error);
  }
});

// Rate Meal
router.post("/meal/:id", isLoggedIn, async (req, res) => {
  if (!req.body.rating || !req.body.review) {
    return errorMsg(res, "rating and review are required", 400);
  }
  if (req.body.rating < 1 || req.body.rating > 5) {
    return errorMsg(res, "Rating must be between 1 and 5", 400);
  }
  req.body.mealId = req.params.id;
  req.body.customerId = req.user.id;
  req.body.authorName = req.user.first_name;
  try {
    let oldRating = await MealReview.findOne({
      where: { customerId: req.user.id, mealId: req.params.id },
    });
    if (oldRating) {
      const rating = await oldRating.set(req.body).save();
      successMsg(res, "Review saved", rating, 201);
    } else {
      const rating = await MealReview.create(req.body);
      successMsg(res, "Review saved", rating, 201);
    }
  } catch (error) {
    console.log(error);
    errorMsg(res, "UNKNOWN ERROR", 500, error.message || error);
  }
});

module.exports = router;
