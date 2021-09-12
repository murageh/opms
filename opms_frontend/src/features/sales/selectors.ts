import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

export const selectSales = (state: RootState) => state.sales;

export const salesSelector = createSelector(
    selectSales,
    state => state
)