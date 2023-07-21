// Weekly weather
export const selectWeeklyWeather = state => state.weeklyWeather;

export const selectWeeklyWeatherIsLoading = state =>
  state.weeklyWeather.isLoading;

export const selectWeeklyWeatherError = state => state.weeklyWeather.error;

// Weather today
export const selectWeatherToday = state => state.weatherToday;

export const selectWeatherTodayIsLoading = state =>
  state.weatherToday.isLoading;

export const selectWeatherTodayError = state => state.weatherToday.error;
