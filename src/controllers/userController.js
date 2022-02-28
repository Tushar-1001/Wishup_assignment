const userModel = require("../models/userModel");


const date = require('date-and-time');

const validator = require("../validators/validator");

//User Creation API
const userCreation = async (req, res) => {
  try {
    const userName = req.params.userName;

    const searchUser = await userModel.findOne({ userName });

    if (searchUser) {
      return res
        .status(400)
        .send({ status: false, msg: `${userName} is already registered.` });
    }

    await userModel.create({ userName });

    const responseBody = {
      userName,
      createdAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    };

    return res.status(200).send('User Created');
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};


//Fetching User
const fetchUser = async (req, res) => {




  try {
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  userCreation,
  fetchUser,
};
