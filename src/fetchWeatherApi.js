"use strict";

import fetch from 'node-fetch';

export const fetchWeatherApi = async (relativePath, searchParams) => {
  const url = new URL(relativePath, "https://api.openweathermap.org/");

  url.search = new URLSearchParams({
    ...searchParams,
    appid: process.env.OPEN_WEATHER_MAP_API_KEY,
  });

  const res = await fetch(url);

  const json = await res.json();

  console.log(json);
  return json;
};
