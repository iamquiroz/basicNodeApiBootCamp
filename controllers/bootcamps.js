const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocoder");
const Bootcamp = require("../models/Bootcamps");

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = asyncHandler(async (request, response, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...request.query };

  // Fields to execute
  const removeFields = ['select'];

  // Loop over remoFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  console.log(reqQuery);

  // Copy query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, $lt, $lte, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Finding resource
  query = Bootcamp.find(JSON.parse(queryStr));

 // Executing query
  const bootcamps = await query;

  response
    .status(200)
    .json({ success: true, count: bootcamps.lenght, data: bootcamps });
});

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = asyncHandler(async (request, response, next) => {
  //  const bootcamp = await Bootcamp.find (request.params.id);
  const bootcamp = await Bootcamp.findById(request.params.id);
  return next(
    new ErrorResponse(`Bootcamp not found with id of ${request.params.id}`, 404)
  );

  if (!bootcamp) {
    return response.status(400).json({ success: false });
  }
});

// @desc    Create new bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  if (!bootcamp) {
    return new ErrorResponse(`Resourse something wrong`, 400);
  }
  return res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

// @desc    Update bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootcamp) {
    new ErrorResponse(
      `Bootcamp not found with id of ${request.params.id}`,
      404
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc    Delete bootcamp
// @route   DeLETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    new ErrorResponse(
      `Bootcamp not found with id of ${request.params.id}`,
      404
    );
  }

  res.status(200).json({ success: true, data: {} });
});

// @desc  Get bootcamps within a radius
//  @route GET /api/v1/bootcamps/radius/:zipcode/:distance
//  @access Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,663 mi
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    success: true,
    count: bootcamps.lenght,
    data: bootcamps,
  });
});
