const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Bootcamp = require("../models/Bootcamps");

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = asyncHandler(async (request, response, next) => {
  const bootcamps = await Bootcamp.find();

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
  
    let bootcamp = await Bootcamp.create(req.body);
  
    if (!bootcamp) {
      return res.status(400).json({
        success: true,
        data: bootcamp,
      });
    } else {
      res.status(201).json({ success: true, data: bootcamp });
    }
  
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



