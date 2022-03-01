const subscriptionModel = require("../models/subscriptionModel");
const userModel = require("../models/userModel");

const validator = require("../validators/validator");

//Create Subscription API........
const createSubscription = async (req, res) => {
  try {
    let requestBody = req.body;

    const { userName, planId, startDate } = requestBody;

    if (!validator.isValidRequestBody(requestBody)) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid request body." });
    }
    if (!validator.isValidString(userName)) {
      return res
        .status(400)
        .send({ status: false, message: "UserName is required" });
    }
    if (!validator.isValidString(planId)) {
      return res
        .status(400)
        .send({ status: false, message: "PlanId is required" });
    }
    if (!validator.isValidString(startDate)) {
      return res
        .status(400)
        .send({ status: false, message: "Start Date is required" });
    }

    //Searhing user in database
    const findUser = await userModel.findOne({ userName });

    console.log(findUser);

    if (!findUser) {
      return res
        .status(400)
        .send({ status: false, message: `${userName} not found.` });
    }

    let daysLeftObj = {
      FREE: 3,
      TRIAL: 7,
      LITE_1M: 30,
      PRO_1M: 30,
      LITE_6M: 180,
      PRO_6M: 180,
    };

    let amountObj = {
      FREE: 0,
      TRIAL: 0,
      LITE_1M: 100,
      PRO_1M: 200,
      LITE_6M: 500,
      PRO_6M: 900,
    };

    console.log(daysLeftObj[planId]);
    console.log(amountObj[planId]);

    const validUptoDate = new Date(startDate);

    console.log(validUptoDate);

    //Using setDate() method to add validity(days) to the startDate
    validUptoDate.setDate(validUptoDate.getDate() + daysLeftObj[planId]);

    // console.log(validUptoDate);

    //Saving Data into the database
    const saveSubscriptionData = await subscriptionModel.create({
      userName,
      planId,
      startDate,
      validTill: validUptoDate,
    });

    // console.log(saveSubscriptionData);

    return res.status(200).send({
      status: "Success",
      amount: `${amountObj[planId]} USD debited.`,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

// const fetchingSubscriptionDetailsWithDate = async (req, res) => {
//   try {
//     const userName = req.params.userName;
//     const userDate = req.params.date;

//     const findSubscriptions = await subscriptionModel.find({
//       userName,
//       userDate,
//     });

//     // let diff = findSubscriptions[0]["validTill"] - findSubscriptions[0]["startDate"]

//     let daysLeft = findSubscriptions.map();

//     console.log(new Date(userDate));

//     // console.log(findSubscriptions)

//     return res.status(200).send({ data: findSubscriptions });
//   } catch (error) {
//     return res.status(500).send({ status: false, message: error.message });
//   }
// };

//Fetching Subscription details without date.......
const fetchingSubscriptionDetailsWithoutDate = async (req, res) => {
  try {
    const userName = req.params.userName;

    const findSubscriptions = await subscriptionModel
      .find({ userName })
      .select({ planId: 1, startDate: 1, validTill: 1, _id: 0 });

    // let diff = findSubscriptions[0]["validTill"] - findSubscriptions[0]["startDate"]

    // console.log(diff/(1000*60*60*24))

    return res.status(200).send({ data: findSubscriptions });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  createSubscription,
  // fetchingSubscriptionDetailsWithDate,
  fetchingSubscriptionDetailsWithoutDate,
};
