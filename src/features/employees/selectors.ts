import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

export const selectEmployees = (state: RootState) => state.employees;

export const employeeSelector = createSelector(
    selectEmployees,
    state => state
)