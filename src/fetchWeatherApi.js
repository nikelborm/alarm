"use strict";

export const fetchWeatherApi = async (relativePath, searchParams) => {
  const url = new URL(relativePath, "https://api.openweathermap.org/");

  url.search = new URLSearchParams(searchParams);

  const res = await fetch(url);

  const json = await res.json();

  console.log(json);
  return json;
};