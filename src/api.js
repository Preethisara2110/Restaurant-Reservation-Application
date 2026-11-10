const API = 'https://restaurantdata.onrender.com'

async function getJson(url) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Request failed (${response.status})`)
  return response.json()
}
export const getStates = () => getJson(`${API}/states`)
export const getCities = state => getJson(`${API}/cities/${encodeURIComponent(state)}`)
export const getRestaurants = (state, city) =>
  getJson(`${API}/restaurants?state=${encodeURIComponent(state)}&city=${encodeURIComponent(city)}`)

export function listFrom(data, keys = []) {
  if (Array.isArray(data)) return data
  for (const key of keys) if (Array.isArray(data?.[key])) return data[key]
  if (data && typeof data === 'object') {
    const candidate = Object.values(data).find(Array.isArray)
    if (candidate) return candidate
  }
  return []
}
export function restaurantList(data) {
  return listFrom(data, ['restaurants', 'data', 'results', 'result'])
}