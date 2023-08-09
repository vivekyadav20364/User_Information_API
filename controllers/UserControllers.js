const asyncHandler = require("express-async-handler");
const User = require("../modals/userSchema");
const bcrypt = require("bcryptjs");
const generateToken = require("../config/generateToken");

const registerUser = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  const pic = req.file;
  if (pic == undefined){
    res
      .status(500)
      .json({
        message: "Invalid image type (only jpeg and png image type allowed)",
      });
  }
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    //  console.log("User already exists");
    return res
      .status(200)
      .send({ message: "User already exist Login to Continue" });
    //throw new Error("user already exists");
  }

  // we encrypt the password for security
  const salt = await bcrypt.genSalt(10);
  //greater the gensalt value more time it take
  const hashedPassword = await bcrypt.hash(password, salt);
  const newpassword = hashedPassword;

  const user = await User.create({
    name,
    email,
    mobile,
    password: newpassword,
    pic: pic.filename,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      pic: user.pic,
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the User");
  }
};

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(200).send({ message: "user not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(200).send({ message: "Invalid Email or Password" });
  }

  if (isMatch) {
    const Token = generateToken(user._id);
    const UserInfo = {
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: Token,
      message: " Login successful",
    };
    res.status(201).json(UserInfo);
  }
});

const allUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    res.json({ message: error });
  }
});

const findOneUser = asyncHandler(async (req, res) => {
  try {
    const oneUser = await User.findById(req.params.userId).select("-password");
    if(!oneUser){
        res.status(500).json("User not found");
    }
    res.json(oneUser);
  } catch (error) {
    res.json({ message: error });
  }
});

const UpdateUser = asyncHandler(async (req, res) => {
  try {
    const { name, mobile } = req.body;

    const userId = req.user._id;
   // console.log("UserID : ", userId);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name: name,
        mobile: mobile,
      },
      {
        new: true,
      }
    );

    if (!updatedUser) {
      res.status(404);
      throw new Error("User not Found");
    } else {
      res.json({
        message: "Successfully updated details",
        updatedUser: updatedUser,
      });
    }
  } catch (error) {
    res.json({ message: error });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    if (!req.user) {
      res.status(404);
      throw new Error("User not found");
    }
    const userId = req.user._id;

    //console.log("deleteduserId: ", userId);
    const deletedUser = await User.findByIdAndRemove(userId);
    // console.log(deleteUser,userId);

    res.json({ message: "User Deleted Successfully" });
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = {
  registerUser,
  authUser,
  allUsers,
  findOneUser,
  UpdateUser,
  deleteUser,
};
