import { createSelector } from '@reduxjs/toolkit';
import { selectFilter } from 'redux/filter/selectors';

export const selectTrips = state => state.trips;

export const selectActiveTripId = state => state.trips.activeTripId;

export const selectVisibleTrips = createSelector(
  [selectTrips, selectFilter],
  (trips, filter) => {
    const normalizeFilter = filter?.toLowerCase();

    return trips?.items.filter(({ city }) =>
      city?.toLowerCase().includes(normalizeFilter)
    );
  }
);

export const selectActiveTrip = createSelector(
  [selectTrips, selectActiveTripId],
  (trips, activeTripId) => {
    return trips?.items.find(trip => trip.id === activeTripId);
  }
);
