"use strict";

import { fetchWeatherApi } from './fetchWeatherApi.js';

export const fetchSunriseAndSunset = async (cityName) => {
  const [{ lat, lon }] = await fetchWeatherApi(
    'geo/1.0/direct',
    { q: cityName, limit: 1 }
  );

  let { sys: {
    sunrise: sunriseUTCseconds,
    sunset: sunsetUTCseconds,
  } } = await fetchWeatherApi(
    'data/2.5/weather',
    { lat, lon }
  );

  const millisecondsInOneSecond = 1000;

  const sunset = new Date(sunsetUTCseconds * millisecondsInOneSecond);
  const sunrise = new Date(sunriseUTCseconds * millisecondsInOneSecond);

  return {
    sunrise,
    sunset,
  };
}
