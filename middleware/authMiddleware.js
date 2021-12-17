const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncMiddleware");

exports.protect = () => asyncHandler(async (req, res, next) => {
  let token;
  
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not Authorized to Access This Route", 401));
  }

try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if(req.headers.role === 'doctor'){
        
        req.user = await Doctor.findById(decoded.id);
        
      }else{
       
        req.user = await Patient.findById(decoded.id);
       

      }
    next();
  } catch (error) {
    return next(new ErrorResponse("Not Authorized to Access This Route", 401));
  }
});

exports.authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(
      new ErrorResponse(
        `User role : '${req.user.role}' not permitted to Access This Route`,
        403
      )
    );
  }
  next();
};
