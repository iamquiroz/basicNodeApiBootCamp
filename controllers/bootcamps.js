const ErrorResponse = require("../utils/errorResponse");
const Bootcamp = require("../models/Bootcamps");

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = async (request, response, next) => {
  try {
    const bootcamps = await Bootcamp.find();

    response
      .status(200)
      .json({ success: true, count: bootcamps.lenght, data: bootcamps });
  } catch (error) {
    response.status(400).json({ success: false });
  }
};

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = async (request, response, next) => {
  try {
    //  const bootcamp = await Bootcamp.find (request.params.id);
    const bootcamp = await Bootcamp.findById(request.params.id);
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${request.params.id}`, 404)
    );

    if (!bootcamp) {
      return response.status(400).json({ success: false });
    }
  } catch (error) {
    next(
      new ErrorResponse(`Bootcamp not found with id of ${request.params.id}`, 404)
    );
  }
};

// @desc    Create new bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamp = async (req, res, next) => {
  try {
    let bootcamp = await Bootcamp.create(req.body);
    console.log(req.body);
    if (!bootcamp) {
      return res.status(400).json({
        success: true,
        data: bootcamp,
      });
    } else {
      res.status(201).json({ success: true, data: bootcamp });
    }
  } catch (error) {
    res.status(403).json({ success: false });
  }
};

// @desc    Update bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc    Delete bootcamp
// @route   DeLETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    let bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
