# TableEase – Restaurant Reservation App

A responsive React + Vite restaurant reservation application built to match the supplied TableEase design reference.

## Features
- State and city dropdowns loaded from the supplied restaurant API.
- Search restaurants by state and city.
- Restaurant cards with name, address, city, state and overall rating.
- Booking flow with the next 7 days, Morning/Afternoon/Evening time slots and guest selection.
- Reservations persist in `localStorage` using the required `bookings` key.
- `/my-bookings` route for saved reservations.
- Responsive desktop and mobile layouts.
- Swiper-powered inspiration carousel.

## Run locally
1. Install Node.js (18+ recommended).
2. Extract the ZIP and open this folder in VS Code.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL printed by Vite.

## Production build
Run `npm run build`. The output is generated in `dist/`.

## API
- `GET https://restaurantdata.onrender.com/states`
- `GET https://restaurantdata.onrender.com/cities/:state`
- `GET https://restaurantdata.onrender.com/restaurants?state=:state&city=:city`

The API may take 50–60 seconds to respond on its first request. The app shows a loading state while waiting. Restaurant results are read from common response array keys (`restaurants`, `data`, `results`, or `result`) and the UI supports common field-name variants.

## Required test selectors / conventions
- State dropdown wrapper: `div#state`
- City dropdown wrapper: `div#city`
- Search submit button: `button#searchBtn[type="submit"]`
- Search results heading: `<h1>{count} restaurants available in {city}</h1>`
- Restaurant name: `<h3>`
- Booking action: `Book FREE Reservation`
- My bookings route and `<h1>My Bookings</h1>`
- Time-of-day labels use `<p>`
- localStorage key: `bookings`

## Notes
Images are loaded from Unsplash URLs and Google Fonts are loaded from Google Fonts, so an internet connection is needed for those visual assets. API data is fetched live and is not replaced with invented restaurant records.
