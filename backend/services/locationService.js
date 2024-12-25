const traderModel = require("../models/traderModel");
const distanceUtils = require("../utils/distanceUtils");

async function assignTraderToUser(userLocation) {
  const traders = await traderModel.find();
  const nearestTraders = traders.filter(
    (trader) =>
      distanceUtils.haversineDistance(userLocation, trader.location) <= 10 // 10 km max distance
  );

  if (nearestTraders.length > 0) {
    return nearestTraders[0]; // Return the closest trader
  } else {
    throw new Error("No traders found within the specified distance");
  }
}

module.exports = {
  assignTraderToUser,
};
