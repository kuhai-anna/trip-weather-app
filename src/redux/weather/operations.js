import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = 'B2XSG74B7MJYTTNXX5NDQ2VKH';

axios.defaults.baseURL =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services';

// Get-request weather for a week
export const fetchWeeklyWeather = createAsyncThunk(
  '/weeklyWeather/fetchWeekly',
  async ({ city, startDate, endDate, signal }, thunkAPI) => {
    try {
      const response = await axios.get(
        `/timeline/${city}/${startDate}/${endDate}`,
        {
          params: {
            unitGroup: 'metric',
            include: 'days',
            key: `${API_KEY}`,
            contentType: 'json',
          },
          signal,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get-request today`s weather
export const fetchWeatherToday = createAsyncThunk(
  '/weatherToday/fetchToday',
  async ({ city, signal }, thunkAPI) => {
    try {
      const response = await axios.get(`/timeline/${city}/today`, {
        params: {
          unitGroup: 'metric',
          include: 'days',
          key: `${API_KEY}`,
          contentType: 'json',
        },
        signal,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
