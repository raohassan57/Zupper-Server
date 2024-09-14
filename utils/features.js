import jwt from "jsonwebtoken";

const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};


const sendToken = (res, user, statusCode, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return res.status(statusCode).cookie("zupper-token", token, cookieOptions).json({
    success: true,
    user,
    message,
  });
};




export { cookieOptions, sendToken }