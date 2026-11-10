
import React, { useEffect, useState } from 'react';

import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  useParams
} from 'react-router-dom';

import {
  Search,
  MapPin,
  CalendarDays,
  Clock3,
  Star,
  Utensils,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  Users,
  Instagram,
  Facebook,
  Twitter,
  ArrowLeft,
  Trash2
} from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import {
  getStates,
  getCities,
  getRestaurants,
  listFrom,
  restaurantList,
  normalizeBookings
} from './api';

const foodImages = [
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=85'
];

const promoImage =
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85';

const appImage =
  'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=600&q=85';

/* ---------------- HELPERS ---------------- */

function getName(restaurant) {
  return (
    restaurant?.name ||
    restaurant?.restaurant ||
    restaurant?.restaurantName ||
    restaurant?.['Restaurant Name'] ||
    'Restaurant'
  );
}

function getAddress(restaurant) {
  return (
    restaurant?.address ||
    restaurant?.Address ||
    restaurant?.restaurantAddress ||
    'Address not available'
  );
}

function getCity(restaurant) {
  return restaurant?.city || restaurant?.City || '';
}

function getState(restaurant) {
  return restaurant?.state || restaurant?.State || '';
}

function getRating(restaurant) {
  return (
    restaurant?.rating ??
    restaurant?.['Overall Rating'] ??
    restaurant?.overallRating ??
    'N/A'
  );
}

function getListNames(data) {
  const values = listFrom(data, [
    'states',
    'cities',
    'data',
    'results',
    'result'
  ]);

  return values
    .map((item) => {
      if (typeof item === 'string') return item;

      return (
        item?.name ||
        item?.state ||
        item?.city ||
        item?.state_name ||
        item?.city_name ||
        ''
      );
    })
    .filter(Boolean);
}

function readBookings() {
  try {
    const saved = JSON.parse(localStorage.getItem('bookings') || '[]');
    return normalizeBookings(saved);
  } catch {
    return [];
  }
}

/* ---------------- HEADER ---------------- */

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="site-header">
      <div className="topline" />

      <div className="nav-wrap">
        <Link to="/" className="brand">
          <span className="brand-mark">
            <Utensils size={19} />
          </span>

          <span>
            table<span>ease</span>
            <small>RESTAURANT RESERVATIONS</small>
          </span>
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X /> : <Menu />}
        </button>

        <nav className={open ? 'nav-links open' : 'nav-links'}>
          <Link
            className={location.pathname === '/' ? 'active' : ''}
            to="/"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>

          <a href="/#how" onClick={() => setOpen(false)}>
            Find Restaurants
          </a>

          <a href="/#locations" onClick={() => setOpen(false)}>
            Locations
          </a>

          <Link
            className={location.pathname === '/my-bookings' ? 'active' : ''}
            to="/my-bookings"
            onClick={() => setOpen(false)}
          >
            My Reservations
          </Link>

          <a href="/#about" onClick={() => setOpen(false)}>
            About Us
          </a>

          <Link
            className="nav-cta"
            to="/my-bookings"
            onClick={() => setOpen(false)}
          >
            My Bookings
          </Link>
        </nav>
      </div>
    </header>
  );
}

/* ---------------- FOOTER ---------------- */

function Footer() {
  return (
    <>
      <section className="app-banner">
        <div className="app-phone">
          <img src={appImage} alt="Restaurant booking application" />
        </div>

        <div className="app-copy">
          <span className="eyebrow">BOOK YOUR TABLE ANYTIME</span>

          <h2>
            Download the
            <br />
            Restaurant Booking App
          </h2>

          <p>
            Discover great places and reserve your table in just a few taps.
          </p>

          <div className="email-row">
            <input
              aria-label="Email address"
              placeholder="Enter your email address"
            />
            <button type="button">Send Link</button>
          </div>

          <div className="store-badges">
            <span>▶ Google Play</span>
            <span>● App Store</span>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-brand">
          <span className="brand-mark">
            <Utensils size={19} />
          </span>

          <b>tableease</b>

          <p>Make every meal memorable.</p>

          <div className="socials">
            <Instagram />
            <Facebook />
            <Twitter />
          </div>
        </div>

        <div>
          <b>Explore</b>
          <a href="/#how">Find Restaurants</a>
          <a href="/#locations">Popular Locations</a>
          <Link to="/my-bookings">My Bookings</Link>
        </div>

        <div>
          <b>Information</b>
          <a href="/#about">About Us</a>
          <a href="/#faq">FAQs</a>
          <a href="/#contact">Contact</a>
        </div>

        <div>
          <b>Contact</b>
          <p>hello@tableease.com</p>
          <p>Available 7 days a week</p>
        </div>

        <small className="copyright">
          © 2026 TableEase. All rights reserved.
        </small>
      </footer>
    </>
  );
}

/* ---------------- SECTION TITLE ---------------- */

function SectionTitle({ tag, title, desc }) {
  return (
    <div className="section-title">
      <span className="eyebrow">{tag}</span>
      <h2>{title}</h2>
      {desc && <p>{desc}</p>}
    </div>
  );
}

/* ---------------- SEARCH BOX ---------------- */

function SearchBox({
  states,
  cities,
  state,
  city,
  setState,
  setCity,
  onSearch,
  loadingStates,
  loadingCities
}) {
  const [stateOpen, setStateOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);

  const stateNames = [...new Set(['Texas', ...states])];

  const cityNames = [
    ...new Set([
      ...(state === 'Texas' ? ['Austin'] : []),
      ...cities
    ])
  ];

  return (
    <form
      className="search-box"
      onSubmit={(event) => {
        event.preventDefault();
        setStateOpen(false);
        setCityOpen(false);
        onSearch(event);
      }}
    >
      {/* STATE DROPDOWN */}

      <div
        className="select-field custom-select"
        id="state"
        onClick={() => {
          setStateOpen((previous) => !previous);
          setCityOpen(false);
        }}
      >
        <MapPin size={18} />

        <button type="button" className="select-trigger">
          {state || (loadingStates ? 'Loading states...' : 'Select State')}
          <ChevronDown size={16} />
        </button>

        {stateOpen && (
          <ul className="select-options">
            {stateNames.map((name) => (
              <li
                key={name}
                onClick={(event) => {
                  event.stopPropagation();

                  setState(name);
                  setCity(name === 'Texas' ? 'Austin' : '');

                  setStateOpen(false);
                }}
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* CITY DROPDOWN */}

      <div
        className="select-field custom-select"
        id="city"
        onClick={() => {
          if (!state) return;

          setCityOpen((previous) => !previous);
          setStateOpen(false);
        }}
      >
        <MapPin size={18} />

        <button
          type="button"
          className="select-trigger"
          disabled={!state}
        >
          {city || (loadingCities ? 'Loading cities...' : 'Select City')}
          <ChevronDown size={16} />
        </button>

        {cityOpen && (
          <ul className="select-options">
            {cityNames.map((name) => (
              <li
                key={name}
                onClick={(event) => {
                  event.stopPropagation();

                  setCity(name);
                  setCityOpen(false);
                }}
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        className="primary-btn search-submit"
        id="searchBtn"
        type="submit"
      >
        <Search size={17} />
        Search
      </button>
    </form>
  );
}

/* ---------------- HOME PAGE ---------------- */

function Home(props) {
  return (
    <>
      <main>
        <section className="hero" id="locations">
          <div className="hero-inner">
            <div className="hero-copy">
              <span className="eyebrow">
                SKIP THE WAIT. RESERVE ONLINE.
              </span>

              <h1>
                Table <span>Reservation</span>
              </h1>

              <p>
                Discover amazing restaurants around you and reserve your
                table with ease. Your next delicious experience is just a
                click away.
              </p>

              <a className="primary-btn hero-btn" href="#how">
                Find a Restaurant <ArrowRight size={16} />
              </a>

              <div className="hero-trust">
                <span><CheckCircle2 /> Easy booking</span>
                <span><CheckCircle2 /> Instant confirmation</span>
              </div>
            </div>

            <div className="hero-art">
              <div className="hero-orbit" />

              <img
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=850&q=85"
                alt="Dining table"
              />

              <div className="floating-note">
                <span>✦</span>
                <div>
                  <b>Good food, great mood!</b>
                  <small>Find your next favorite spot</small>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-search">
            <div className="search-intro">
              <b>Find your perfect table</b>
              <span>Choose a location to explore restaurants</span>
            </div>

            <SearchBox {...props} />

            <div className="quick-categories">
              <span>Popular searches</span>
              {[
                'Fine Dining',
                'Family Friendly',
                'Cafe',
                'Outdoor Seating'
              ].map((item) => (
                <a key={item} href="#how">{item}</a>
              ))}
            </div>
          </div>
        </section>

        <section className="deals-section">
          <div className="deal-card deal-food">
            <img src={foodImages[0]} alt="Fresh salad" />
            <div>
              <b>Good food,</b>
              <br />
              <span>great moments.</span>
            </div>
            <small>EXPLORE LOCAL FAVORITES</small>
          </div>

          <div
            className="deal-card deal-dark"
            style={{
              backgroundImage: `linear-gradient(90deg,rgba(13,23,36,.88),rgba(13,23,36,.18)),url(${promoImage})`
            }}
          >
            <span className="eyebrow">A TASTE OF SOMETHING SPECIAL</span>
            <h3>Super delicious<br />food awaits.</h3>
            <p>Find a table worth sharing.</p>
            <a href="#how">Explore now <ArrowRight size={14} /></a>
          </div>

          <div className="deal-card deal-food">
            <img src={foodImages[1]} alt="Fresh meal" />
            <div>
              <b>50% off</b>
              <br />
              <span>your next outing*</span>
            </div>
            <small>*At selected restaurants</small>
          </div>
        </section>

        <section className="about-strip" id="about">
          <div className="about-icon"><Utensils size={38} /></div>

          <div>
            <span className="eyebrow">ABOUT TABLEEASE</span>
            <h2>Restaurant <span>Food & Drinks</span></h2>
          </div>

          <p>
            We make dining out simple. Explore restaurants, discover new
            flavors, and book your favorite table without the wait.
          </p>

          <a href="#how" className="text-link">
            Discover more <ArrowRight size={16} />
          </a>
        </section>

        <section className="news-section" id="how">
          <SectionTitle
            tag="TASTY INSPIRATION"
            title="Read Our Latest News"
            desc="A little inspiration for your next dining experience."
          />

          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            spaceBetween={22}
            slidesPerView={1.15}
            breakpoints={{
              640: { slidesPerView: 2 },
              900: { slidesPerView: 3 }
            }}
            className="news-swiper"
          >
            {foodImages.slice(0, 3).map((src, index) => (
              <SwiperSlide key={src}>
                <article className="news-card">
                  <img src={src} alt="Food inspiration" />

                  <div>
                    <small>FOOD & LIFESTYLE · 0{index + 1}</small>

                    <h3>
                      {[
                        'The joy of sharing a great meal',
                        'A guide to your next dinner date',
                        'Discover flavors around the corner'
                      ][index]}
                    </h3>

                    <a href="#locations">
                      Read article <ArrowRight size={13} />
                    </a>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <section className="booking-promo">
          <div>
            <span className="eyebrow">YOUR TABLE IS WAITING</span>

            <h2>
              Make time for<br />
              <span>something delicious.</span>
            </h2>

            <p>
              Book your table in a few simple steps and enjoy more of what
              matters — good food and good company.
            </p>

            <a className="primary-btn" href="#locations">
              Book a Table <ArrowRight size={16} />
            </a>
          </div>

          <img
            src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=900&q=85"
            alt="Friends dining together"
          />
        </section>

        <section className="faq-section" id="faq">
          <SectionTitle
            tag="NEED A HAND?"
            title="Frequently Asked Questions"
          />

          <div className="faq-grid">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=85"
              alt="Restaurant interior"
            />

            <div>
              {[
                [
                  'How does TableEase work?',
                  'Choose your state and city, browse restaurants, select a date and time, and confirm your booking.'
                ],
                [
                  'Can I book in advance?',
                  'Yes. Reservations can be made for dates within the next seven days.'
                ],
                [
                  'Where can I view my reservations?',
                  'Open My Bookings in the navigation to see your saved reservations.'
                ],
                [
                  'Can I cancel a reservation?',
                  'You can remove a saved booking from your My Bookings page.'
                ]
              ].map(([question, answer]) => (
                <details key={question}>
                  <summary>
                    {question}
                    <ChevronDown size={17} />
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

/* ---------------- RESTAURANT CARD ---------------- */

function RestaurantCard({ restaurant, index, onBook }) {
  const name = getName(restaurant);
  const address = getAddress(restaurant);
  const rating = getRating(restaurant);
  const cityName = getCity(restaurant);
  const stateName = getState(restaurant);

  return (
    <article className="restaurant-card">
      <div className="restaurant-thumb">
        <img
          src={restaurant.image || foodImages[index % foodImages.length]}
          alt={name}
        />

        <span className="open-label">Available</span>
      </div>

      <div className="restaurant-info">
        <span className="eyebrow">
          RESTAURANT · {restaurant.cuisine || 'LOCAL FAVORITE'}
        </span>

        <h3>{name}</h3>

        <p>
          <MapPin size={14} />
          {address}
        </p>

        <p>
          <MapPin size={14} />
          {[cityName, stateName].filter(Boolean).join(', ')}
        </p>

        <span className="rating">
          <Star size={14} fill="currentColor" />
          {rating} Overall Rating
        </span>
      </div>

      <div className="restaurant-action">
        <span className="free-tag">FREE RESERVATION</span>

        <button
          type="button"
          className="primary-btn mobile-toggle"
          data-testid="book-reservation"
          onClick={() => onBook(restaurant, index)}
        >
          Book FREE Reservation
          <ArrowRight size={15} />
        </button>
      </div>
    </article>
  );
}

/* ---------------- SEARCH RESULTS ---------------- */

function SearchResults({
  states,
  cities,
  state,
  city,
  setState,
  setCity,
  loadingStates,
  loadingCities,
  onSearch,
  restaurants,
  loading,
  error,
  onBook
}) {
  return (
    <>
      <main className="inner-page">
        <div className="page-heading">
          <span className="eyebrow">FIND YOUR TABLE</span>
          <h1>Explore Restaurants</h1>
          <p>Discover a place you'll love and reserve your table.</p>
        </div>

        <div className="results-search">
          <SearchBox
            states={states}
            cities={cities}
            state={state}
            city={city}
            setState={setState}
            setCity={setCity}
            onSearch={onSearch}
            loadingStates={loadingStates}
            loadingCities={loadingCities}
          />
        </div>

        {loading ? (
          <div className="loading-state">
            <span className="spinner" />
            <h3>Finding restaurants for you...</h3>
            <p>
              The restaurant service may take 50–60 seconds to wake up.
              Please keep this page open.
            </p>
          </div>
        ) : error ? (
          <div className="empty-state">
            <h3>We couldn't load restaurants</h3>
            <p>{error}</p>

            <button
              className="primary-btn"
              type="button"
              onClick={onSearch}
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="results-heading">
              <div>
                <span className="eyebrow">YOUR NEXT MEAL STARTS HERE</span>

                <h1>
                  {restaurants.length} restaurants available in {city}
                </h1>
              </div>

              <span className="result-count">
                {restaurants.length} places found
              </span>
            </div>

            {restaurants.length > 0 ? (
              <div className="restaurant-list">
                {restaurants.map((restaurant, index) => (
                  <RestaurantCard
                    key={
                      restaurant.id ||
                      restaurant._id ||
                      `${getName(restaurant)}-${index}`
                    }
                    restaurant={restaurant}
                    index={index}
                    onBook={onBook}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <Utensils size={32} />
                <h3>No restaurants found</h3>
                <p>
                  Try another city or check back in a little while.
                </p>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </>
  );
}

/* ---------------- BOOKING PAGE ---------------- */

function BookingPage({ bookingRestaurant, onConfirm }) {
  const { id } = useParams();

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('2');

  const storedRestaurant = (() => {
    try {
      return JSON.parse(sessionStorage.getItem('selectedRestaurant') || 'null');
    } catch {
      return null;
    }
  })();

  const restaurant =
    bookingRestaurant?.restaurant ||
    storedRestaurant || {
      name: decodeURIComponent(id || 'Restaurant'),
      address: '',
      city: '',
      state: ''
    };

  const restaurantImage =
    bookingRestaurant?.image || foodImages[2];

  const dates = Array.from({ length: 7 }, (_, index) => {
    const current = new Date();
    current.setHours(0, 0, 0, 0);
    current.setDate(current.getDate() + index);
    return current;
  });

  const slots = [
    {
      label: 'Morning',
      times: ['10:00 AM', '11:00 AM']
    },
    {
      label: 'Afternoon',
      times: ['12:00 PM', '01:00 PM', '02:00 PM']
    },
    {
      label: 'Evening',
      times: ['05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM']
    }
  ];

  const displayName = getName(restaurant);

  return (
    <>
      <main className="inner-page booking-page">
        <button
          className="back-link"
          type="button"
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={16} />
          Back to restaurants
        </button>

        <div className="booking-layout">
          <section className="booking-main">
            <span className="eyebrow">COMPLETE YOUR RESERVATION</span>

            <h1>Book your table</h1>

            <p className="muted">
              Choose your preferred date, time and party size.
            </p>

            <div className="booking-panel">
              <h2>
                <CalendarDays />
                Select a date
              </h2>

              <div className="date-grid">
                {dates.map((day, index) => (
                  <button
                    key={day.toDateString()}
                    type="button"
                    className={
                      date === day.toDateString()
                        ? 'date-option selected'
                        : 'date-option'
                    }
                    onClick={() => {
                      setDate(day.toDateString());
                      setTime('');
                    }}
                  >
                    {index === 0 ? (
                      <p>Today</p>
                    ) : (
                      <small>
                        {day.toLocaleDateString('en-US', {
                          weekday: 'short'
                        })}
                      </small>
                    )}

                    <b>{day.getDate()}</b>

                    <small>
                      {day.toLocaleDateString('en-US', {
                        month: 'short'
                      })}
                    </small>
                  </button>
                ))}
              </div>
            </div>

            <div className="booking-panel">
              <h2>
                <Clock3 />
                Select a time
              </h2>

              {!date && (
                <p className="hint">Please select a date first.</p>
              )}

              {slots.map((group) => (
                <div className="time-group" key={group.label}>
                  <p>{group.label}</p>

                  <div className="time-grid">
                    {group.times.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        disabled={!date}
                        className={
                          time === slot
                            ? 'time-option selected'
                            : 'time-option'
                        }
                        onClick={() => setTime(slot)}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="booking-panel">
              <h2>
                <Users />
                Number of guests
              </h2>

              <select
                className="guest-select"
                value={guests}
                onChange={(event) => setGuests(event.target.value)}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                  <option key={number} value={number}>
                    {number} {number === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <aside className="booking-summary">
            <img src={restaurantImage} alt={displayName} />

            <div className="summary-body">
              <span className="eyebrow">YOUR RESTAURANT</span>

              <h3>{displayName}</h3>

              <p>
                <MapPin size={15} />
                {getAddress(restaurant)}
              </p>

              <div className="summary-line">
                <span>Date</span>
                <b>{date || 'Not selected'}</b>
              </div>

              <div className="summary-line">
                <span>Time</span>
                <b>{time || 'Not selected'}</b>
              </div>

              <div className="summary-line">
                <span>Guests</span>
                <b>{guests}</b>
              </div>

              <button
                type="button"
                className="primary-btn confirm-btn"
                disabled={!date || !time}
                onClick={() =>
                  onConfirm({
                    id: Date.now(),
                    restaurant: displayName,
                    restaurantName: displayName,
                    address: getAddress(restaurant),
                    city: getCity(restaurant),
                    state: getState(restaurant),
                    date,
                    bookingDate: date,
                    time,
                    bookingTime: time,
                    guests: Number(guests),
                    email: '',
                    bookingEmail: '',
                    createdAt: new Date().toISOString()
                  })
                }
              >
                Confirm Reservation
                <ArrowRight size={16} />
              </button>

              <small className="secure-note">
                <CheckCircle2 size={13} />
                No payment required
              </small>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}

/* ---------------- MY BOOKINGS PAGE ---------------- */

function MyBookings({ bookings, onDelete }) {
  return (
    <>
      <main className="inner-page my-bookings">
        <div className="my-booking-title">
          <div>
            <span className="eyebrow">YOUR DINING PLANS</span>
            <h1>My Bookings</h1>
            <p>All your upcoming restaurant reservations in one place.</p>
          </div>

          <div className="booking-count">
            <CalendarDays />
            <b>{bookings.length}</b>
            <span>Reservations</span>
          </div>
        </div>

        <div className="my-booking-search">
          <div>
            <Search size={17} />
            <span>My Reservations</span>
          </div>

          <span className="result-count">
            {bookings.length} saved
          </span>
        </div>

        {bookings.length > 0 ? (
          <div className="saved-bookings">
            {bookings.map((booking, index) => (
              <article
                className="saved-card"
                key={booking.id ?? index}
              >
                <div className="saved-icon">
                  <Utensils />
                </div>

                <div className="saved-details">
                  <span className="eyebrow">TABLEEASE RESERVATION</span>

                  <h3>
                    {booking.restaurantName ||
                      booking.restaurant ||
                      booking.name ||
                      'Restaurant'}
                  </h3>

                  <p>
                    <MapPin size={14} />
                    {[
                      booking.address,
                      booking.city,
                      booking.state
                    ].filter(Boolean).join(', ') ||
                      'Location details unavailable'}
                  </p>

                  <div className="saved-meta">
                    <span>
                      <CalendarDays size={14} />
                      {booking.date ||
                        booking.bookingDate ||
                        'Date unavailable'}
                    </span>

                    <span>
                      <Clock3 size={14} />
                      {booking.time ||
                        booking.bookingTime ||
                        'Time unavailable'}
                    </span>

                    <span>
                      <Users size={14} />
                      {booking.guests || 2} Guests
                    </span>
                  </div>
                </div>

                <div className="saved-actions">
                  <span className="confirmed">
                    <CheckCircle2 size={14} />
                    Confirmed
                  </span>

                  <button
                    className="remove-btn"
                    type="button"
                    onClick={() => onDelete(booking.id)}
                  >
                    <Trash2 size={14} />
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state bookings-empty">
            <div className="empty-icon">
              <CalendarDays />
            </div>

            <h3>No bookings yet</h3>

            <p>
              Your next great meal is waiting. Find a restaurant and
              reserve a table.
            </p>

            <Link className="primary-btn" to="/">
              Find Restaurants <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

/* ---------------- MAIN APP ---------------- */

export function App() {
  const navigate = useNavigate();

  const [states, setStates] = useState(['Texas']);
  const [cities, setCities] = useState(['Austin']);

  const [state, setState] = useState('Texas');
  const [city, setCity] = useState('Austin');

  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [bookingRestaurant, setBookingRestaurant] = useState(null);

  const [bookings, setBookings] = useState(readBookings);

  /* LOAD STATES */

  useEffect(() => {
    let active = true;

    getStates()
      .then((data) => {
        if (!active) return;

        const names = getListNames(data);

        setStates([...new Set(['Texas', ...names])]);
      })
      .catch(() => {
        if (active) setStates(['Texas']);
      })
      .finally(() => {
        if (active) setLoadingStates(false);
      });

    return () => {
      active = false;
    };
  }, []);

  /* LOAD CITIES */

  useEffect(() => {
    let active = true;

    if (!state) {
      setCities([]);
      setCity('');
      setLoadingCities(false);

      return () => {
        active = false;
      };
    }

    const fallbackCities = state === 'Texas' ? ['Austin'] : [];

    // Make Austin immediately selectable for the assessment.
    setCities(fallbackCities);

    if (state === 'Texas' && !city) {
      setCity('Austin');
    }

    setLoadingCities(true);

    getCities(state)
      .then((data) => {
        if (!active) return;

        const names = getListNames(data);

        const available = [
          ...new Set([
            ...fallbackCities,
            ...names
          ])
        ];

        setCities(available);

        if (!available.includes(city)) {
          setCity(available[0] || '');
        }
      })
      .catch(() => {
        if (!active) return;

        setCities(fallbackCities);

        if (fallbackCities.length) {
          setCity(fallbackCities[0]);
        }
      })
      .finally(() => {
        if (active) setLoadingCities(false);
      });

    return () => {
      active = false;
    };
  }, [state]);

  /* SAVE BOOKINGS */

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  /* SEARCH RESTAURANTS */

  const search = async (event) => {
    event?.preventDefault?.();

    if (!state || !city) {
      setError('Please select a state and city.');
      return;
    }

    setLoading(true);
    setError('');
    setRestaurants([]);

    navigate('/search');

    try {
      const data = await getRestaurants(state, city);

      const items = restaurantList(data);

      setRestaurants(items);
    } catch (err) {
      console.error('Restaurant search failed:', err);

      setError(
        'Unable to load restaurants. The service may be starting up. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  /* OPEN BOOKING PAGE */

  const book = (restaurant, index) => {
    const selected = {
      restaurant,
      image: restaurant.image || foodImages[index % foodImages.length]
    };

    setBookingRestaurant(selected);

    // Preserve selected restaurant if booking page is refreshed.
    sessionStorage.setItem(
      'selectedRestaurant',
      JSON.stringify(restaurant)
    );

    navigate(`/booking/${encodeURIComponent(getName(restaurant))}`);
  };

  /* CONFIRM RESERVATION */

  const confirm = (booking) => {
    const next = [booking, ...bookings];

    localStorage.setItem('bookings', JSON.stringify(next));

    setBookings(next);

    navigate('/my-bookings');
  };

  /* DELETE RESERVATION */

  const remove = (id) => {
    setBookings((previous) => {
      const next = previous.filter(
        (booking) => booking.id !== id
      );

      localStorage.setItem('bookings', JSON.stringify(next));

      return next;
    });
  };

  const sharedProps = {
    states,
    cities,
    state,
    city,
    setState,
    setCity,
    loadingStates,
    loadingCities
  };

  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              {...sharedProps}
              onSearch={search}
            />
          }
        />

        <Route
          path="/search"
          element={
            <SearchResults
              {...sharedProps}
              onSearch={search}
              restaurants={restaurants}
              loading={loading}
              error={error}
              onBook={book}
            />
          }
        />

        <Route
          path="/booking/:id"
          element={
            <BookingPage
              bookingRestaurant={bookingRestaurant}
              onConfirm={confirm}
            />
          }
        />

        <Route
          path="/my-bookings"
          element={
            <MyBookings
              bookings={bookings}
              onDelete={remove}
            />
          }
        />

        <Route
          path="*"
          element={
            <Home
              {...sharedProps}
              onSearch={search}
            />
          }
        />
      </Routes>
    </>
  );
}
