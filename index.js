"use strict";

import { fetchSunriseAndSunset } from './src/fetchSunriseAndSunset.js';
import soundPlayer from 'play-sound';

const player = soundPlayer();


let lastWakeUpTimeout;
let lastGoToBedTimeout;
let lastWaitingForNextDayTimeout;
let rejectWaitingForNextDay;
let shouldExit = false;

process.on('SIGINT', () => {
  clearTimeout(lastWakeUpTimeout);
  clearTimeout(lastGoToBedTimeout);
  clearTimeout(lastWaitingForNextDayTimeout);
  shouldExit = true;
  rejectWaitingForNextDay();
  console.log('Received SIGINT. Exiting...');
});


while(!shouldExit) {
  let sunrise, sunset;
  try {
    ({ sunrise, sunset } =
      await fetchSunriseAndSunset(process.env.LOCATION_CITY));
  } catch (error) {
    console.error('Error while fetching occurred:', error);
    continue;
  }

  const now = new Date();
  const timeToSunrise = sunrise - now;
  const timeToSunset = sunset - now;

  lastWakeUpTimeout = setTimeout(() => {
    console.log('Wake up!');
    player.play(process.env.PATH_TO_WAKE_UP_SOUND_FILE, (err) => {
      if (err) console.log(`Could not play sound: ${err}`);
    });
  }, timeToSunrise);
  console.log('Planned wake up time in ', timeToSunrise / 1000 / 60 / 60, 'hours');

  lastGoToBedTimeout = setTimeout(() => {
    console.log('Go to sleep!');
  }, timeToSunset);
  console.log('Planned go to bed time in ', timeToSunset / 1000 / 60 / 60, 'hours');

  await (
    new Promise((resolve, reject) => {
      rejectWaitingForNextDay = reject;
      const millisecondsInOneDay = 24 * 60 * 60 * 1000;
      lastWaitingForNextDayTimeout = setTimeout(() => resolve(), millisecondsInOneDay)
    })
  ).then(
    () => console.log('Day passed. Repeating planning...'),
    () => console.log('manually finished awaiting of the day')
  );
}
