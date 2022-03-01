const userModel = require("../models/userModel");

const date = require("date-and-time");


//User Creation API..............
const userCreation = async (req, res) => {
  try {
    const userName = req.params.userName;

    //Searhing user in database
    const searchUser = await userModel.findOne({ userName });

    if (searchUser) {
      return res
        .status(400)
        .send({ status: false, msg: `${userName} is already registered.` });
    }

    await userModel.create({
      userName,
      createdAt: new Date,
    });

    return res.status(200).send("User Created");
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

//Fetching User API...........
const fetchUser = async (req, res) => {
  try {
    const userName = req.params.userName;

    //Searhing user in database
    const findUser = await userModel.findOne({ userName }).select({_id:0 , __v :0} );

    if (!findUser) {
      return res
        .status(400)
        .send({ status: false, message: `${userName} doesn't exist.` });
    }

    return res.status(200).send({ data : findUser });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  userCreation,
  fetchUser,
};
