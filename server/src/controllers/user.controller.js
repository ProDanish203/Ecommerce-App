import { User } from "../models/user.model.js";

export const getCurrentUser = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      message: "User fetched",
      data: req.user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};


export const getSingleUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select(
      "-password -refreshToken -forgotPasswordToken -forgotPasswordTokenExpiry -verifyToken -verifyTokenExpiry"
    );
    if (!user) return next("Unauthorized Access");

    return res.status(200).json({
      success: true,
      message: "User fetched",
      data: user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};