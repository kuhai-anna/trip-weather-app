import { createSlice, nanoid } from '@reduxjs/toolkit';
import { fetchWeeklyWeather, fetchWeatherToday } from './operations';

const hendlePending = state => {
  state.isLoading = true;
};

const hendleRejected = (state, action) => {
  state.isLoading = false;
  state.message = action.payload;
};

const weeklyWeatherSlice = createSlice({
  name: 'weeklyWeather',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchWeeklyWeather.pending, hendlePending)
      .addCase(fetchWeeklyWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.days.map(item => {
          return {
            id: nanoid(),
            date: item.datetime,
            icon: item.icon,
            tempmax: item.tempmax,
            tempmin: item.tempmin,
          };
        });
      })
      .addCase(fetchWeeklyWeather.rejected, hendleRejected);
  },
});

const weatherTodaySlice = createSlice({
  name: 'weatherToday',
  initialState: {
    items: {},
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      // fetch today`s weather
      .addCase(fetchWeatherToday.pending, hendlePending)
      .addCase(fetchWeatherToday.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = {
          date: action.payload.days[0].datetime,
          temp: action.payload.days[0].temp,
          icon: action.payload.days[0].icon,
        };
      })
      .addCase(fetchWeatherToday.rejected, hendleRejected);
  },
});

export const weeklyWeatherReducer = weeklyWeatherSlice.reducer;
export const weatherTodayReducer = weatherTodaySlice.reducer;
