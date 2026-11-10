
const API = 'https://restaurantdata.onrender.com';

async function getJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

export const getStates = () => getJson(`${API}/states`);

export const getCities = (state) =>
  getJson(`${API}/cities/${encodeURIComponent(state)}`);

export const getRestaurants = (state, city) =>
  getJson(
    `${API}/restaurants?state=${encodeURIComponent(state)}&city=${encodeURIComponent(city)}`
  );

export function listFrom(data, keys = []) {
  if (Array.isArray(data)) return data;

  for (const key of keys) {
    if (Array.isArray(data?.[key])) return data[key];
  }

  if (data && typeof data === 'object') {
    const candidate = Object.values(data).find(Array.isArray);
    if (candidate) return candidate;
  }

  return [];
}

function firstValue(item, keys, fallback = '') {
  for (const key of keys) {
    if (item?.[key] !== undefined && item[key] !== null) {
      return item[key];
    }
  }

  return fallback;
}

export function restaurantList(data) {
  return listFrom(data, [
    'restaurants',
    'data',
    'results',
    'result'
  ]).map((item, index) => ({
    ...item,

    id: firstValue(item, ['id', '_id'], index),

    name: firstValue(item, [
      'Restaurant Name',
      'RestaurantName',
      'restaurantName',
      'restaurant_name',
      'name'
    ], 'Restaurant'),

    address: firstValue(item, [
      'Address',
      'Restaurant Address',
      'address',
      'restaurantAddress',
      'restaurant_address'
    ]),

    city: firstValue(item, [
      'City',
      'city'
    ]),

    state: firstValue(item, [
      'State',
      'state'
    ]),

    rating: firstValue(item, [
      'Overall Rating',
      'overallRating',
      'overall_rating',
      'Rating',
      'rating'
    ], 0)
  }));
}

export function normalizeBookings(data) {
  if (!Array.isArray(data)) return [];

  return data.map((item, index) => ({
    ...item,

    id: item.id ?? item._id ?? `saved-${index}`,

    restaurant:
      item.restaurant ??
      item.restaurantName ??
      item.name ??
      'Restaurant',

    address: item.address ?? item.Address ?? '',

    city: item.city ?? item.City ?? '',

    state: item.state ?? item.State ?? '',

    date:
      item.date ??
      item.bookingDate ??
      '',

    time:
      item.time ??
      item.bookingTime ??
      '',

    guests:
      Number(item.guests ?? item.numberOfGuests ?? 2),

    email:
      item.email ??
      item.bookingEmail ??
      ''
  }));
}
