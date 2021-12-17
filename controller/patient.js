const Patient = require("../models/Patient");
const base64Img = require('base64-img');
const asyncHandler = require("../middleware/asyncMiddleware");

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
        token
      });
  };

  // desc     get all patients
//route     get /api/v1/patient
//access    private
exports.getPatients = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// desc     login
//route     post /api/v1/patient/login
//access    public
exports.login = asyncHandler(async (req, res, next) => {
    const { password, name } = req.body;
    if (!password || !name) {
      return next(
        new ErrorResponse("please provide your name and password", 400)
      );
    }
  
    const user = await Patient.findOne({ name }).select("+password");
    if (!user) {
      return next(new ErrorResponse("invalid name or password", 401));
    }
  
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(new ErrorResponse("invalid name or password", 401));
    }
  
    sendTokenResponse(user, 200, res);
  });


// desc     create a Patient
//route     post /api/v1/patient/
//access    private

exports.register = asyncHandler(async (req, res, next) => {
  req.body.createdBy = req.user.id;
 // if you want to store image in the file system
//   const image = req.body.image;
//   const name = `patient_${req.user.id}_${new Date().getTime()}`;
//   //upload image
//  base64Img.img(image, process.env.FILE_UPLOAD_PATH, name,async function(err, filepath) {
//    req.body.image = filepath
   
//   });
  const user = await Patient.create(req.body);

  res.status(201).json({ success: true, data: user });

  
}); 


exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await Patient.findById(req.user.id);
    if (!user) {
      return next(new ErrorResponse("Patient not found", 401));
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
