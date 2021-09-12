import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

export const selectActivities = (state: RootState) => state.activities;

export const activitySelector = createSelector(
    selectActivities,
    state => state
)