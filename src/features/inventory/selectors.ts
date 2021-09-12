import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

export const selectInventory = (state: RootState) => state.inventory;

export const inventorySelector = createSelector(
    selectInventory,
    state => state
)