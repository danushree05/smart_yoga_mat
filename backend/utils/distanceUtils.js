function haversineDistance(coord1, coord2) {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radius of Earth in kilometers
  const dLat = toRad(coord2.coordinates[1] - coord1.coordinates[1]);
  const dLon = toRad(coord2.coordinates[0] - coord1.coordinates[0]);
  const lat1 = toRad(coord1.coordinates[1]);
  const lat2 = toRad(coord2.coordinates[1]);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

module.exports = {
  haversineDistance,
};
