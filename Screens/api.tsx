import axios from 'axios';

const YOUR_OPENROUTESERVICE_API_KEY = '5b3ce3597851110001cf62489cbd10326296422b883343a69a585114';
const YOUR_MAPBOX_API_KEY = 'sk.eyJ1IjoidmlсZW5lc3MiLCJhIjoiY2x2dHN0a2tvMDkzMDJrbWp1eDluZ2xhbCJ9.sD5hhtymuNGcFiO6TRzO8A';

export const fetchWheelchairRoute = async (startCoordinates: { latitude: number; longitude: number }, endCoordinates: { latitude: number; longitude: number }) => {
  const response = await axios.get(
    `https://api.openrouteservice.org/v2/directions/wheelchair?api_key=${YOUR_OPENROUTESERVICE_API_KEY}&start=${startCoordinates.longitude},${startCoordinates.latitude}&end=${endCoordinates.longitude},${endCoordinates.latitude}`
  );
  return response.data;
};

export const reverseGeocoding = async (longitude: number, latitude: number) => {
  const response = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${YOUR_MAPBOX_API_KEY}`
  );
  return response.data;
};
