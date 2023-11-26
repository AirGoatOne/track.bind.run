function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

// Helper function to convert radians to degrees
function toDegrees(radians: number) {
  return (radians * 180) / Math.PI;
}

export function calculateBearing(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  // Convert latitude and longitude from degrees to radians
  lat1 = toRadians(lat1);
  lon1 = toRadians(lon1);
  lat2 = toRadians(lat2);
  lon2 = toRadians(lon2);

  // Calculate the difference in longitudes
  var dLon = lon2 - lon1;

  // Calculate the bearing using the Haversine formula
  var y = Math.sin(dLon) * Math.cos(lat2);
  var x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  var bearing = Math.atan2(y, x);

  // Convert the bearing from radians to degrees
  bearing = toDegrees(bearing);

  // Normalize the result to a compass bearing (0 to 360 degrees)
  bearing = (bearing + 360) % 360;

  return bearing;
}
