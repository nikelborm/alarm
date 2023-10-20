# Alarm

This script fetches the sunrise and sunset times for a specific location and schedules reminders to wake up and go to bed based on those times. It also plays a sound when it's time to wake up. The script runs indefinitely until it receives a SIGINT signal.

## Env
To use this project, you will need to set the following environment variables in a `.env` file:

- `OPENWEATHERMAP_API_KEY`: Your API key for the OpenWeatherMap API.
- `LOCATION_CITY`: The name of the city for which you want to fetch the sunrise and sunset times.
- `PATH_TO_WAKE_UP_SOUND_FILE`: The path to the sound file that should be played when it's time to wake up.

Make sure to replace the values with your own API key, city name, and file path.
