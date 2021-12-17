const Doctor = require("../models/Doctor");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncMiddleware");


exports.register = asyncHandler(async (req, res, next) => {
  const { name, surname, age, cadre, department, gender, password, role } = req.body;

  const user = await Doctor.create({ name, surname, age, cadre, department, gender, password, role });
  sendTokenResponse(user, 200, res);
});

// desc     get all doctors
//route     post /api/v1/auth/login
//access    public
exports.getDoctors = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// desc     login
//route     post /api/v1/auth/login
//access    public
exports.login = asyncHandler(async (req, res, next) => {
  const { password, name } = req.body;
  if (!password || !name) {
    return next(
      new ErrorResponse("please provide your name and password", 400)
    );
  }

  const user = await Doctor.findOne({ name }).select("+password");
  if (!user) {
    return next(new ErrorResponse("invalid name or password", 401));
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("invalid name or password", 401));
  }

  sendTokenResponse(user, 200, res);
});

//get token from model, sign and send token via response and cookie
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      token,
      role:user.role,
      name:`${user.name}_${user.surname}`
    });
};

exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await Doctor.findById(req.user.id);
  if (!user) {
    return next(new ErrorResponse("Doctor not found", 401));
  }
  res.status(200).json({ success: true, data: user });
});


// desc     logout user
//route     get /api/v1/auth/logout
//access    private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true
  });
  res.status(200).json({ success: true, data: {} });
});
