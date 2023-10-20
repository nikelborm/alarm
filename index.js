"use strict";

import { fetchSunriseAndSunset } from './src/fetchSunriseAndSunset.js';
import soundPlayer from 'play-sound';

const player = soundPlayer();


let lastWakeUpTimeout;
let lastGoToBedTimeout;
let lastGlobalTimeout;
let lastGlobalReject;
let shouldExit = false;

process.on('SIGINT', () => {
  clearTimeout(lastWakeUpTimeout);
  clearTimeout(lastGoToBedTimeout);
  clearTimeout(lastGlobalTimeout);
  shouldExit = true;
  lastGlobalReject();
  console.log('Received SIGINT. Exiting...');
});


while(!shouldExit) {
  const {
    sunrise,
    sunset,
  } = await fetchSunriseAndSunset('Ростов на дону');

  const now = new Date();
  const timeToSunrise = sunrise - now;
  const timeToSunset = sunset - now;

  const millisecondsInOneDay = 1000;

  lastWakeUpTimeout = setTimeout(() => {
    console.log('Wake up!');
    player.play('./sounds/Keanu_Cyberpunk_2077.mp3', (err) => {
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
      lastGlobalReject = reject;
      lastGlobalTimeout = setTimeout(() => resolve(), millisecondsInOneDay)
    })
  ).then(
    () => console.log('Day passed. Repeating planning...'),
    () => console.log('manually finished awaiting of the day')
  );
}
